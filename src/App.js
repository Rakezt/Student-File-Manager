import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StudentView from "./component/students/StudentView";
import SchoolView from "./component/school/SchoolView";
import Classview from "./component/class/Classview";
import StudentDetail from "./component/students/StudentDetail";
import StudentForm from "./component/students/StudentForm";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div className="navbar">
            <div className="logo">
              <Link to="/" className="logo-link">
                School Student Manager
              </Link>
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Student</Link>
                </li>
                <li>
                  <Link to="/classes">Class</Link>
                </li>
                <li>
                  <Link to="/school">School</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="container">
            <Routes>
              <Route path="/" element={<StudentView />} />
              <Route path="/students/:id" element={<StudentDetail />} />
              <Route path="/students/add" element={<StudentForm />} />
              <Route path="/students/edit/:id/" element={<StudentForm />} />
              <Route path="/classes" element={<Classview />} />
              <Route path="/school" element={<SchoolView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
