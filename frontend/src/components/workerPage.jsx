import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

const WorkerPage = () => {
  const [formData, setFormData] = useState({
    approval: '',
    names: "",
    amount: "",
    reason: "",
    date: "",
    filepath: null,
    comments: '',
  });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/requests/one');
        setRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };
        
    fetchData();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const simpleDate = newDate.toISOString().split('T')[0];
    return simpleDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      filepath: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('names', formData.names);
    data.append('amount', formData.amount);
    data.append('date', formData.date);
    data.append('reason', formData.reason);
    if(formData.filepath) {
      data.append('file', formData.filepath);
    }
    data.append('comments', formData.comments);
    data.append('approval', formData.approval);
    try {
      const response = await api.post('/api/requests', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full h-full flex-col">
      <h2 className="text-3xl font-bold mb-4 mt-10">Worker Dashboard</h2>
      <form onSubmit={handleSubmit} className="p-4 my-6 mx-10 bg-white w-auto flex flex-col lg:flex-row">
        <div className="flex flex-col space-y-5 w-full">
          <h2 className='text-2xl font-bold mb-4 mt-3'>Please Fill In this form To Request Money</h2>  
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-7">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="names"
              placeholder="Please Enter Your Full name"
              value={formData.names}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3">
            <label htmlFor="amount" className="block text-lg font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              min={0}
              placeholder="Please Enter the Amount You Need"
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-5">
            <label htmlFor="reason" className="block text-lg font-medium text-gray-700">Reason</label>
            <input
              type="text"
              id="reason"
              name="reason"
              placeholder="Please Enter The Reason Why you need it"
              value={formData.reason}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-10">
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0">
            <label htmlFor="file" className="block text-lg font-medium text-gray-700">Attach File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            <label htmlFor="comment" className="block text-lg font-medium text-gray-700">Comment</label>
            <textarea
              id="comment"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="border p-2 w-full"
              rows="4"
              placeholder="Please Enter Your Comment"
            ></textarea>
          </div>
          <h1 className="mt-10 text-lg font-medium">Previous requests</h1>
          <ul>
            {requests.map((request) => (
              <li key={request.id} className="mt-2">Amount: {request.amount} | Date: {formatDate(request.date)} | Status: {request.status}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col lg:ml-6 mt-6 lg:mt-0"> 
        <div className="flex flex-col space-y-2">
      <label htmlFor="approval" className="block text-lg font-medium text-gray-700">Choose Approval</label>
         <select
          id="approval"
          name="approval"
          value={formData.approval}
          onChange={handleChange}
          className="p-2 border"
        >
          <option value="" disabled>Select approval</option>
          <option value={1}>Approval 1</option>
          <option value={2}>Approval 2</option>
        </select>
      </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-2xl w-full mt-6">Send</button>
        </div>
      </form>
    </div>
  );
};

export default WorkerPage;
