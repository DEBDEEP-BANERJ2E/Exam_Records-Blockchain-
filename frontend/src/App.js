import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ExamRecordCard from './components/ExamRecordCard';
import DashboardPage from './components/DashboardPage';
import AdminPage from './components/AdminPage';
import VerifyPage from './components/VerifyPage';
import Navbar from './components/Navbar';
import BlockchainStatus from './components/BlockchainStatus';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const location = useLocation();

  // Routes that should display the Header
  const showHeaderRoutes = ['/', '/login', '/register'];

  // Determine if the Header or Navbar should be shown
  const showHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {/* Conditional rendering of Header or Navbar */}
      {showHeader ? <Header /> : <Navbar />}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/exam-records"
          element={<ExamRecordCard exam={{ name: 'Math Exam', date: '2024-06-12', status: 'Passed' }} />}
        />
        <Route path="/student-dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/blockchain-status" element={<BlockchainStatus />} />
        <Route path="/loading" element={<LoadingSpinner />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
