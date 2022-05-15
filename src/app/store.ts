import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import classeReducer from '../features/classes/classesSlice';
import classeStudentReducer from '../features/classesStudents/classesStudentsSlice';

export const store = configureStore({
  reducer: {
    student: studentsReducer,
    classe:classeReducer,
    classesStudents:classeStudentReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
