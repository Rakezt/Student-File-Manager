import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  `students/fetchStudents`,
  async () => {
    const response = await axios.get(
      `https://0c9dbf03-c6a6-4f52-a6d2-cfcc25b8f7bc-00-1yujtf6z3pv73.sisko.replit.dev/students`
    );
    return response.data;
  }
);
export const addStudentAsync = createAsyncThunk(
  `students/addStudentAsync`,
  async (newStudent) => {
    const response = await axios.post(
      `https://0c9dbf03-c6a6-4f52-a6d2-cfcc25b8f7bc-00-1yujtf6z3pv73.sisko.replit.dev/students`,
      newStudent
    );
    return response.data;
  }
);
export const updateStudentAsync = createAsyncThunk(
  `students/updateStudentAsync`,
  async ({ id, updatedStudent }) => {
    const response = await axios.put(
      `https://0c9dbf03-c6a6-4f52-a6d2-cfcc25b8f7bc-00-1yujtf6z3pv73.sisko.replit.dev/students/${id}`,
      updatedStudent
    );
    return response.data;
  }
);
export const deleteStudentAsync = createAsyncThunk(
  `students/deleteStudentAsync`,
  async (id) => {
    const response = await axios.delete(
      `https://0c9dbf03-c6a6-4f52-a6d2-cfcc25b8f7bc-00-1yujtf6z3pv73.sisko.replit.dev/students/${id}`
    );
    return response.data;
  }
);

const initialState = {
  students: [],
  status: `idle`,
  error: null,
  filter: "All",
  sortBy: "name",
};
const studentsSlice = createSlice({
  name: `students`,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students.push(action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedStudent = action.payload;
        const index = state.students.findIndex(
          (student) => student.id === updatedStudent.id
        );
        if (index !== -1) {
          state.students[index] = updatedStudent;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student.id !== action.payload.id
        );
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice;
