import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Money Request System</h1>
      <div className="space-y-4">
        <Link to="/worker-login" className="btn btn-primary">Worker Login</Link>
        <Link to="/accountant-login" className="btn btn-primary">Accountant Login</Link>
        <Link to="/manager-login" className="btn btn-primary">Manager Login</Link>
      </div>
    </div>
  );
};

export default HomePage;