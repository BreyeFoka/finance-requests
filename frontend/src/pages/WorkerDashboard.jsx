
import React, { useState, useEffect } from 'react';
import { createRequest } from '../services/api';

const WorkerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    name: '',
    amount: '',
    reason: '',
    date: ''
  });

  useEffect(() => {
    // Fetch previous requests
    const fetchRequests = async () => {
      try {
        const response = await fetchRequests();
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRequest(newRequest);
      if (response.data.success) {
        setRequests((prevRequests) => [...prevRequests, newRequest]);
        setNewRequest({ name: '', amount: '', reason: '', date: '' });
      } else {
        alert('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Previous Requests</h2>
        <ul className="space-y-2">
          {requests.map((request, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded shadow">
              <div><strong>Amount:</strong> {request.amount}</div>
              <div><strong>Reason:</strong> {request.reason}</div>
              <div><strong>Date:</strong> {request.date}</div>
              <div><strong>Status:</strong> {request.status}</div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">New Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newRequest.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={newRequest.amount}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={newRequest.reason}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="date"
            value={newRequest.date}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default WorkerDashboard;
