import React from "react";
import { useLocation, Link } from "react-router-dom"; // Import useLocation
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const location = useLocation();
  const username = location.state?.username || "Guest"; // Retrieve username from state

  const semesters = [
    {
      semester: "1st Semester",
      courses: [
        { name: "Mathematics - I", marks: 85, status: "Pass" },
        { name: "Physics", marks: 72, status: "Pass" },
        { name: "Basic Electrical Engineering", marks: 90, status: "Pass" },
        { name: "Engineering Graphics", marks: 65, status: "Pass" },
        { name: "Programming for Problem Solving", marks: 38, status: "Fail" },
      ],
    },
    {
      semester: "2nd Semester",
      courses: [
        { name: "Mathematics - II", marks: 78, status: "Pass" },
        { name: "Chemistry", marks: 89, status: "Pass" },
        { name: "Basic Mechanical Engineering", marks: 67, status: "Pass" },
        { name: "Data Structures and Algorithms", marks: 94, status: "Pass" },
        { name: "English Communication", marks: 81, status: "Pass" },
      ],
    },
    {
      semester: "3rd Semester",
      courses: [
        { name: "Discrete Mathematics", marks: 88, status: "Pass" },
        { name: "Digital Logic Design", marks: 76, status: "Pass" },
        { name: "Object-Oriented Programming", marks: 91, status: "Pass" },
        { name: "Database Management Systems", marks: 85, status: "Pass" },
        { name: "Computer Organization", marks: 73, status: "Pass" },
      ],
    },
    {
      semester: "4th Semester",
      courses: [
        { name: "Operating Systems", marks: 82, status: "Pass" },
        { name: "Computer Networks", marks: 78, status: "Pass" },
        { name: "Software Engineering", marks: 84, status: "Pass" },
        { name: "Theory of Computation", marks: 68, status: "Pass" },
        { name: "Design and Analysis of Algorithms", marks: 39, status: "Fail" },
      ],
    },
    {
      semester: "5th Semester",
      courses: [
        { name: "Artificial Intelligence", marks: 80, status: "Pass" },
        { name: "Compiler Design", marks: 89, status: "Pass" },
        { name: "Web Development", marks: 94, status: "Pass" },
        { name: "Cloud Computing", marks: 87, status: "Pass" },
        { name: "Mobile App Development", marks: 79, status: "Pass" },
      ],
    },
    {
      semester: "6th Semester",
      courses: [
        { name: "Machine Learning", marks: 91, status: "Pass" },
        { name: "Cyber Security", marks: 85, status: "Pass" },
        { name: "Internet of Things (IoT)", marks: 90, status: "Pass" },
        { name: "Big Data Analytics", marks: 88, status: "Pass" },
        { name: "Blockchain Technology", marks: 92, status: "Pass" },
      ],
    },
    {
      semester: "7th Semester",
      courses: [
        { name: "Advanced Computer Graphics", marks: 81, status: "Pass" },
        { name: "Robotics and Automation", marks: 75, status: "Pass" },
        { name: "Human-Computer Interaction", marks: 84, status: "Pass" },
        { name: "Quantum Computing", marks: 79, status: "Pass" },
        { name: "Research Methodologies", marks: 86, status: "Pass" },
      ],
    },
    {
      semester: "8th Semester",
      courses: [
        { name: "Project Work", marks: 95, status: "Pass" },
        { name: "Industry Internship", marks: "Completed", status: "Pass" },
        { name: "Seminar on Emerging Technologies", marks: 88, status: "Pass" },
        { name: "Comprehensive Viva", marks: 90, status: "Pass" },
      ],
    },
  ];

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
                    <span className={`course-marks ${course.status.toLowerCase()}`}>
                      {course.marks} ({course.status})
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/verify"><button className="verify-btn">Verify</button></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
