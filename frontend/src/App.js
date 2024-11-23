import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css'; // Import Tailwind CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
    return (
            <Router>
                <div>
                    <Navbar />
                    <div style={{ paddingTop: '0px' }}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/register" element={<RegistrationPage />} />
                            <Route path="*" element={<h1>404 Not Found</h1>} />
                        </Routes>
                    </div>
                </div> {/* Add missing closing div tag here */}
            </Router>
    );
}

export default App;
