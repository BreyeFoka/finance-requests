import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const AccountantDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // State to trigger data fetch

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to load requests.');
      }
    };

    fetchRequests();
  }, [refresh]); // Fetch data when `refresh` state changes

  const formatDate = (date) => {
    const newDate = new Date(date);
    const simpleDate = newDate.toISOString().split('T')[0];
    return simpleDate;
  };

  const handleApprove = async (id) => {
    try {
      const response = await api.put(`/api/requests/${id}`, { status: 'approved' });
      if (response.data.success) {
        setRefresh((prev) => !prev); // Trigger data fetch
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request.');
      setError('Failed to approve request.');
    }
  };

  const handleDeny = async (id) => {
    try {
      const response = await api.put(`/api/requests/${id}`, { status: 'denied' });
      if (response.data.success) {
        setRefresh((prev) => !prev); // Trigger data fetch
      }
    } catch (error) {
      console.error('Error denying request:', error);
      alert('Failed to deny request.');
      setError('Failed to deny request.');
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/api/export/export-requests', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'requests.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting requests:', error);
      setError('Failed to export requests.');
    }
  };
  const getFullFilePath = (filepath) => {
    // Replace 'YOUR_BASE_URL' with the actual base URL of your server
    const baseURL = 'http://localhost:5000';
    return `${baseURL}/${filepath}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Approval 1 Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Pending Requests</h2>
        <h2 className='txt-xl font-bold text-blue-500'>Total Requests: {requests.length}</h2>
        <h3 className='text-xl font-normal text-black'>No. of Requests Pending: {requests.filter(request => request.status === 'pending').length}</h3>
        <h3 className='text-xl font-normal text-black'>No. of Requests Approved: {requests.filter(request => request.status === 'approved').length}</h3>
        <div className='flex flex-row space-x-10 my-3 mx-3'>
          <h2 className='hidden md:flex flex-col mx-3 font-bold text-xl'>Names</h2>
          <h2 className='hidden md:flex flex-col mx-3 font-bold text-xl'>Amount</h2>
          <h3 className='hidden md:flex flex-col mx-3 font-bold text-xl'>Reason</h3>
          <h3 className='hidden md:flex flex-col mx-3 font-bold text-xl'>Date</h3>
          <h3 className='hidden md:flex flex-col mx-3 font-bold text-xl'>Status</h3>
          <h2 className='hidden md:flex flex-col mx-3 font-bold text-xl'>File attached</h2>
        </div>

        <ul className="space-y-2">
          {requests.filter(request => request.status === 'pending').map((request) => (
            <li key={request.id} className="p-4 bg-gray-100 rounded shadow md:flex md:flex-row md:space-x-10 md:my-3 md:mx-3">
              <div><strong>Name:</strong> {request.names}</div>
              <div><strong>Amount:</strong> {request.amount}</div>
              <div><strong>Reason:</strong> {request.reason}</div>
              <div><strong>Date:</strong> {formatDate(request.date)}</div>
              <div><strong>Status:</strong> {request.status}</div>
              <div><strong>File Attached:</strong> {request.filepath ? 'Yes' : 'No'}</div>
            {request.filepath && (
               <a href={getFullFilePath(request.filepath)} target='_blank' rel="noopener noreferrer" className="text-blue-500  hover:text-blue-700">Download File</a>
              )}
              <div className="mt-2 flex flex-row">
                <button onClick={() => handleApprove(request.id)} className="btn rounded text-white bg-green-500 px-3 py-1">Approve</button>
                <button onClick={() => handleDeny(request.id)} className="btn rounded text-white bg-red-500 px-3 py-1 mt-2 md:mt-0">Deny</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleExport} className="btn text-xl font-medium bg-blue-600 px-2 rounded-xl py-1 text-white shadow-blue-950 shadow-xl">Export Requests</button>
    </div>
  );
};

export default AccountantDashboard;
