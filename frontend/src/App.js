import React from 'react';
import WorkerPage from './components/workerPage';
import ManagerDashboard from './components/ManagerDashboard';
import AccountantDashboard from './components/AccountantDashboard';
import './App.css';

function App() {
  return (
    <div className="App h-screen overflow-y-scroll no-scrollbar">
        {/* <WorkerPage/> */}
        {/* <AccountantDashboard /> */}
        <ManagerDashboard />
    </div>
  );
}

export default App;
