import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addStudentAsync, updateStudentAsync } from "./studentsSlice";

const StudentForm = () => {
  let { state } = useLocation();
  const student = state ? state : null;

  const [name, setName] = useState(student ? student.name : "");
  const [age, setAge] = useState(student ? student.age : "");
  const [grade, setGrade] = useState(student ? student.grade : "");
  const [gender, setGender] = useState(student ? student.gender : "Male");
  const [attendance, setAttendance] = useState(
    student ? student.attendance : null
  );
  const [marks, setMarks] = useState(student ? student.marks : null);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newStudent = {
      name,
      age,
      grade,
      gender,
      attendance,
      marks,
    };

    if (student) {
      dispatch(
        updateStudentAsync({ id: student._id, updatedStudent: newStudent })
      );
    } else {
      dispatch(addStudentAsync(newStudent));
    }
    window.location.href = "/";
  };

  return (
    <div className="student-form-container">
      <h2 className="form-title">{student ? "Edit Student" : "Add Student"}</h2>
      <input
        type="text"
        placeholder="Name"
        className="form-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        className="form-input"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grade"
        className="form-input"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <div className="gender-selection">
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={() => setGender("Male")}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
          />{" "}
          Female
        </label>
      </div>
      {student && (
        <>
          <input
            type="text"
            placeholder="Attendance"
            className="form-input"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />
          <input
            type="text"
            placeholder="Marks"
            className="form-input"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </>
      )}
      <button className="submit-button" onClick={handleSubmit}>
        {student ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default StudentForm;
