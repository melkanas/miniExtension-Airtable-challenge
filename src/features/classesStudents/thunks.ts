import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClasses } from "../classes/classeAPI";
import { fetchStudent, fetchStudentsWithIds } from "../students/studentsAPI";


export const fetchClassesByIds = createAsyncThunk(
    'classes/fetchClassesByIds',
    async (ids:string[]) => {
      const response = await fetchClasses(ids);
      return response.data;
  }
  );

  export const fetchStudentByName = createAsyncThunk(
    'students/fetchStudentByName',
    async (name:string) => {
        const response = await fetchStudent(name);
        return response.data;
  }
  );

  export const fetchStudentsByIds = createAsyncThunk(
    'students/fetchStudentsByIds',
    async (ids:string[])=>{
      const response = await fetchStudentsWithIds(ids);
      return response.data;
    }
  )