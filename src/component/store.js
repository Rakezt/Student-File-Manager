import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./students/studentsSlice";
import schoolSlice from "./school/schoolSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    school: schoolSlice.reducer,
  },
});
