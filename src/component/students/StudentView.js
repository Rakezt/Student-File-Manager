import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentList from "./StudentList";
import { Link } from "react-router-dom";
import { fetchStudents } from "./studentsSlice";

const StudentView = () => {
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div className="student-view-container">
      <h2 className="student-view-title">Student View</h2>
      {status === "loading" && (
        <p className="loading-error-message">Loading...</p>
      )}
      {error && <p className="loading-error-message">Error: {error}</p>}
      <StudentList students={students} />
      <div className="button-container">
        <Link to={`/students/add`}>
          <button>Add Student</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentView;
