import { useAppSelector } from "../../app/hooks"
import Classe from "../classes/Classe";
import Students from "../students/Students";


export const ClassesStudents = ()=>{
    let useSelector = useAppSelector;
    const classes = useSelector(state=>state.classe.classes);
    const students = useSelector(state=>state.student.students);
    const classesStudents =Object.values(useSelector(state=>state.classesStudents.classesStudents));
    type ReduceReturnType = {
        [id:string]: {Name?:string,students:[string]};
      };
    let initialValue:ReduceReturnType = {};
    console.log({classes,students,classesStudents});
    let mapData =  classesStudents.reduce<ReduceReturnType>((acc,curr)=>{
        let {classID,studentID} = curr;
        if(!acc[classID])
            acc[classID] = {Name:classes[classID].Name,students:[students[studentID].Name!]}
        else
            acc[classID].students.push(students[studentID].Name!)
        return acc;
    },initialValue);
    let data = Object.values(mapData)
    return(
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {data.map(({Name,students},index)=>{
                return(
                <div style={{width:'auto',border:'solid',borderRadius:12,padding:10}}>
                <Classe {...{name:Name!,id:index}}/>
                <Students {...{students}}/>
                </div>
                )
            })}
        </div>
    )
}