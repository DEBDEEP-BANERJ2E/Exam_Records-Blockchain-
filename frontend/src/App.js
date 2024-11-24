import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
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
  return (
    <div className="App">
      <Header />
      <Navbar /> {/* Added Navbar */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/exam-records"
          element={<ExamRecordCard exam={{ name: 'Math Exam', date: '2024-06-12', status: 'Passed' }} />}
        />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Dashboard page */}
        <Route path="/admin" element={<AdminPage />} /> {/* Admin page */}
        <Route path="/verify" element={<VerifyPage />} /> {/* Verify page */}
        <Route path="/blockchain-status" element={<BlockchainStatus />} /> {/* Blockchain status */}
        <Route path="/loading" element={<LoadingSpinner />} /> {/* Loading spinner demo */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
