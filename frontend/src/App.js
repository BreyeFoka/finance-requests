// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkerLoginPage from './pages/WorkerLoginPage';
import AccountantLoginPage from './pages/AccountantLoginPage';
import ManagerLoginPage from './pages/ManagerLoginPage';
import ManagerSignupPage from './pages/ManagerSignupPage';
import WorkerDashboard from './pages/WorkerDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import ManagerDashboard from './pages/ManagerDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/worker-login" element={<WorkerLoginPage />} />
        <Route path="/accountant-login" element={<AccountantLoginPage />} />
        <Route path="/manager-login" element={<ManagerLoginPage />} />
        <Route path="/manager-signup" element={<ManagerSignupPage />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
