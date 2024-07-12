// src/pages/ManagerSignupPage.jsx
import React, { useState } from 'react';
import { RegisterUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ManagerSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  setRole('manager');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await RegisterUser(name, email, password, role);
      if (response.data.success) {
        navigate('/manager-login');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Manager Signup</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
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
        <button type="submit" className="btn btn-primary w-full max-w-xs">Sign Up</button>
      </form>
    </div>
  );
};

export default ManagerSignupPage;
