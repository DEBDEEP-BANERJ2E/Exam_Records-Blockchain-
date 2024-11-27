import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const location = useLocation();
  const username = location.state?.username || "Guest"; // Assuming studentName is passed as username

  const [semesters, setSemesters] = useState([]); // State for fetched data
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchStudentRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/student-records/${username}`);
        console.log("Fetched records: ", response.data); // Log the response data
        setSemesters(response.data); // Update state with fetched data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching student records:", error);
        setLoading(false);
      }
    };

    fetchStudentRecords();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <div className="dashboard-page">
      <div className="main-content">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <h3 className="dashboard-student-name">Welcome, {username}</h3>
        <div className="semester-list">
          {semesters.map((semester, index) => (
            <div key={index} className="semester-card">
              <h2 className="semester-title">{semester.semester}</h2>
              <ul className="course-list">
                {semester.courses.map((course, idx) => (
                  <li key={idx} className="course-item">
                    <span className="course-name">{course.name}</span>
                    <span
                      className={`course-marks ${
                        course.status === "Pass" ? "pass" : "unknown"
                      }`}
                    >
                      {course.marks} ({course.status})
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/verify"
                  state={{
                    semester: semester.semester,
                    courses: semester.courses,
                  }}>
                  <button className="verify-btn">Verify</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
