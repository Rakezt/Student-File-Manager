import React from "react";
import { Link } from "react-router-dom";

const StudentList = ({ students }) => {
  return (
    <div className="student-list">
      <h4>Student List</h4>
      <ol>
        {students.map((student) => {
          return (
            <li key={student._id}>
              <Link to={`/students/${student._id}`}>
                <span>Name: {student.name}</span>
                <span> Age: {student.age}</span>
                <span> Grade: {student.grade}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StudentList;
