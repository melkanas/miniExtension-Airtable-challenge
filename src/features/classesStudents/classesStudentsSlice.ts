import { createSlice } from "@reduxjs/toolkit";
import { studentLogout } from "../students/studentsSlice";
import { fetchClassesByIds, fetchStudentByName } from "./thunks";
export interface classeStudent {id:number,classID:string,studentID:string}
export interface classeStudentState {
    classesStudents:{[id:number]:classeStudent},
}
const initialState:classeStudentState = {
    classesStudents:{}
}
export const classesStudentsSlice = createSlice({
    name:"classesStudents",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(fetchStudentByName.fulfilled,(state,action)=>{
            let {Classes,id:studentID} = action.payload;
            Classes.forEach((classe,index)=>{
                state.classesStudents[index] = {id:index,studentID,classID:classe}
            })
        })
        .addCase(fetchClassesByIds.fulfilled,(state,action)=>{
            let payload = action.payload;
            let index = 0;
            payload.forEach(({id:classID,Students})=>{
                Students.forEach((studentID)=>{
                    state.classesStudents[index++] = {id:index,studentID,classID}
                })        
            })
        })
        .addCase(studentLogout.type,(state)=>{
            state.classesStudents = {}
        })
    }
})

export default classesStudentsSlice.reducer;