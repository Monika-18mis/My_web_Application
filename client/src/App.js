// src/App.js
import React, { useState } from 'react';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="container">
      <div className="card">
        <div className="tabs">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'active' : ''}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}

export default App;
