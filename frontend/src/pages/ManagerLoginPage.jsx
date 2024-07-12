// src/pages/ManagerLoginPage.jsx
import React, { useState } from 'react';
import {LoginUser} from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const ManagerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginUser(email, password);
      if (response.data.success) {
        navigate('/manager-dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Manager Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary w-full max-w-xs">Login</button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/manager-signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  );
};

export default ManagerLoginPage;
