import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopStudent, updateSchoolStats } from "./schoolSlice";

const SchoolView = () => {
  const schoolStats = useSelector((state) => state.school);
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalStudents = students.length;
    const totalAttendance = students.reduce(
      (sum, student) => sum + parseFloat(student.attendance),
      0
    );
    const averageAttendance = totalAttendance / totalStudents;
    const totalMarks = students.reduce(
      (sum, student) => sum + parseFloat(student.marks),
      0
    );
    const averageMarks = totalMarks / totalStudents;
    const topStudent = students.reduce((curr, prev) => {
      return parseFloat(curr.marks) > parseFloat(prev.marks) ? curr : prev;
    }, " ");

    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent,
      })
    );

    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);

  return (
    <div className="school-view-container">
      <h2 className="school-view-title">School View</h2>
      <div className="statistics">
        <p>Total Students: {schoolStats.totalStudents}</p>
        <p>Average Attendance: {schoolStats.averageAttendance.toFixed(2)}</p>
        <p>Average Mark: {schoolStats.averageMarks.toFixed(2)}</p>
      </div>
      <p className="top-student">
        Top Student:{" "}
        {schoolStats.topStudent ? schoolStats.topStudent.name : "-"}
      </p>
    </div>
  );
};

export default SchoolView;
