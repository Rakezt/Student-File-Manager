import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../students/studentsSlice";

const Classview = () => {
  const students = useSelector((state) => state.students.students);
  const filter = useSelector((state) => state.students.filter);
  const sortBy = useSelector((state) => state.students.sortBy);
  const dispatch = useDispatch();

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    return student.gender === filter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "marks") return b.marks - a.marks;
    if (sortBy === "attendance") return b.attendance - b.attendance;
    return 0;
  });

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="classview-container">
      <h2 className="classview-title">Class View</h2>
      <div className="filter-sort-controls">
        <label htmlFor="filter">Filter by Gender:</label>
        <select id="filter" onChange={handleFilter} value={filter}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" onChange={handleSort} value={sortBy}>
          <option value="name">Name</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>
      <ul className="student-list">
        {sortedStudents.map((student) => (
          <li key={student._id} className="student-list-item">
            <div className="student-details">
              <div className="student-name">{student.name}</div>
              <div className="student-info">
                Gender: {student.gender} | Marks: {student.marks} | Attendance:{" "}
                {student.attendance}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classview;
