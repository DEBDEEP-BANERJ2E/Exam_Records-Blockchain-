import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and Register

  // Toggle function to switch forms
  const toggleForm = () => {
    setShowLogin(!showLogin); // Toggle the state between true and false
  };

  return (
    <div className="App">
      <h1>Login System</h1>

      {/* Toggle button to switch between Login and Register */}
      <div className="form-toggle">
        <button onClick={toggleForm}>
          {showLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
        </button>
      </div>

      <div className="form-container">
        {showLogin ? <Login /> : <Register />} {/* Conditionally render Login or Register */}
      </div>
    </div>
  );
}

export default App;
