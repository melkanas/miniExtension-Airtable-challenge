import {  FormEvent, useEffect, useMemo } from 'react';

import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { studentLogout, studentNameChanged } from './features/students/studentsSlice';
import { fetchClassesByIds, fetchStudentByName, fetchStudentsByIds } from './features/classesStudents/thunks';
import { ClassesStudents } from './features/classesStudents/ClassesStudents';

function App() {
  let dispatch = useAppDispatch();
  let useSelector = useAppSelector;
  const studentName = useSelector(state=>state.student.studentName);
  const currStudentId = useSelector(state=>state.student.studentID);
  const classesStudents = useSelector(state=>state.classesStudents.classesStudents);
  const classesStatus = useSelector(state=>state.classe.status);
  const students = useSelector(state=>state.student.students);
  let allStudentStatus = useSelector(state=>state.student.status.all);
  let currentStudentStatus = useSelector(state=>state.student.status.current);
  let allStudentIds = useMemo(()=> Object.keys(students),[students]);
  let currStudentClassIds = useMemo(()=>
    Object.values(classesStudents)
  .filter(({studentID})=>studentID ===currStudentId)
 .map(({classID})=>classID)
 ,[classesStudents,currStudentId]);

  useEffect(()=>{
    if(currStudentClassIds.length && classesStatus === 'idle')
      dispatch(fetchClassesByIds(currStudentClassIds));
  },[currStudentClassIds,classesStatus,dispatch])
  
  useEffect(()=>{
    if(allStudentIds.length >= 1 && allStudentStatus==='idle' && classesStatus ==='success')
      dispatch(fetchStudentsByIds(allStudentIds))
  },[allStudentIds,allStudentStatus,classesStatus,dispatch])

  const handleChange = (name:string)=>dispatch(studentNameChanged(name));
  const handleSubmit = (e:FormEvent)=>{e.preventDefault()};
  const handleLogin = ()=>dispatch(fetchStudentByName(studentName));
  let allStatus = [currentStudentStatus,allStudentStatus,classesStatus];
  let oneFailed = allStatus.indexOf('failed');
  let oneIsLoading = allStatus.includes('loading');
  let allSuccess = allStatus.every(v=>v==='success');
  let errorMessage = '';
  let studentError = useSelector(state=>state.student.error);
  let classesError = useSelector(state=>state.classe.error);
  switch (oneFailed) {
    case 0:
      errorMessage = studentError.current!;
      break;
    case 1:
      errorMessage = studentError.all!;
      break;
    case 2:
      errorMessage = classesError!;
      break;
    default:
      break;
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
        {(allSuccess===true) ? <input style={{position:'absolute',top:20,right:20}} type='button' value='logout' onClick={()=>dispatch(studentLogout())}/>:null}
    {
      oneFailed >=0 ? (
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <div>{errorMessage}</div>
        <button onClick={()=>dispatch(studentLogout())}>Try Again</button>
        </div>

      ):oneIsLoading? (
        <>Loading</>
      ):allSuccess?(
        <ClassesStudents/>
      ):(
        <LoginForm {...{studentName,handleLogin,handleChange,handleSubmit}}/>
      )
    }
    </div>
     );
}

const LoginForm = ({studentName,handleSubmit,handleChange,handleLogin}:{studentName:string,handleSubmit:Function,handleChange:Function,handleLogin:Function})=>
  <form onSubmit={(e)=>handleSubmit(e)} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <label>
          Student Name:
          <input style={{marginLeft:20}} type="text" value={studentName} onChange={(e)=>handleChange(e.target.value)} />
        </label>
        <input style={{marginTop:20,width:200}} type='button' value='login' onClick={()=>handleLogin()}/>
  </form>

export default App;
