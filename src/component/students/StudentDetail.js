import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteStudentAsync } from "./studentsSlice";

const StudentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteStudentAsync(id));
  };

  return (
    <div className="student-detail-container">
      <h3 className="detail-title">Student Detail</h3>
      <div className="detail-info">
        <p>Name : {student.name}</p>
        <p>Age : {student.age}</p>
        <p>Grade : {student.grade}</p>
        <p>Gender : {student.gender}</p>
        <p>Attendance : {student.attendance}</p>
        <p>Marks : {student.marks}</p>
      </div>
      <div className="action-buttons">
        <button>
          <Link to={`/students/edit/${student.id}`} state={student}>
            Edit Details
          </Link>
        </button>
        <button onClick={() => handleDelete(student._id)}>Delete</button>
      </div>
    </div>
  );
};

export default StudentDetail;
