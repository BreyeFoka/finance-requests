// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { LoginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await LoginUser(email, password);
      if (response.data.success) {
        navigate(`/${role}-dashboard`);
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
      <h1 className="text-3xl font-bold mb-8">{`${role.charAt(0).toUpperCase() + role.slice(1)} Login`}</h1>
      <div className="space-y-4">
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
        <button onClick={handleLogin} className="btn btn-primary w-full max-w-xs">Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
