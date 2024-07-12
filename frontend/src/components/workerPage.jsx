// src/WorkerPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    file: null,
    comment: '',
    approval: ''
  });
  const [requests, setRequests] = useState([]);
  useEffect(() => {
      fetchData();
  })
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
})

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
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('amount', formData.amount);
    data.append('date', formData.date);
    data.append('file', formData.file);
    data.append('comment', formData.comment);
    data.append('approval', formData.approval);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex w-full h-full flex-col'>
        <h2 className="text-3xl font-bold mb-4 mt-10 ">Worker Page</h2>
    <form onSubmit={handleSubmit} className=" space-x-32 p-4 my-6 mx-10 bg-white w-auto flex flex-row ">
      <div className='flex flex-col space-y-5 w-full'>
          <div className='flex flex-row space-x-7'>
            <label htmlFor="name" className="mt-2 block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Please Enter Your Full name'
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </div>
          <div className='flex flex-row space-x-3'>
            <label htmlFor="amount" className="block mt-2 text-lg font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              min={0}
              placeholder='Please Enter the Amount You Need'
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </div>
          <div className='flex flex-row space-x-5'>
            <label htmlFor="name" className="mt-2 block text-lg font-medium text-gray-700">Reason</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Please Enter The Reason Why you need it'
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </div>
          <div className='flex flex-row space-x-10 w-full'>
            <label htmlFor="date" className="block mt-2 text-lg font-medium text-gray-700">Date</label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="border p-2 w-full"
                maxLength="2"
                required
              />
            </div>
          </div>
            <div className='flex flex-row space-x-0'>
                <label htmlFor="file" className="block mt-3 text-lg w-full font-medium text-gray-700">Attach File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="border p-2 w-full mt-1"
            />
            </div>
          <div className='flex flex-row space-x-4'>
            <label htmlFor="comment" className=" mt-6 block text-lg font-medium text-gray-700">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              rows="4"
              placeholder='Please Enter Your Comment'
              required
            ></textarea>
          </div>
      </div>
      <div>
        <div className='flex flex-row space-x-16 space-y-2 '>
            <label htmlFor="approval" className="block mt-3 text-lg font-medium text-gray-700">Choose Approval</label>
            <select
              id="approval"
              name="approval"
              value={formData.approval}
              onChange={handleChange}
              className="p-2 mt-1"
              required
            >
              <option value="" disabled>Select approval</option>
              <option value="approval1">Approval 1</option>
              <option value="approval2">Approval 2</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-2xl w-full mt-20">Send</button>
            <h1 className='mt-10'>Previous requests</h1>
            <div>
                <ul>
                    {requests.map((request) => (
                        <li key={request.id}>Amount:{request.amount} Date:{request.date} Status:{request.status}</li>
                    ))}
                </ul>
            </div>
      </div>
    </form>
    </div>
  );
};

export default WorkerPage;
