import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

const WorkerPage = () => {
  const [formData, setFormData] = useState({
    // TODO: uncomment line 7
    // name: '',
    amount: "",
    reason: "",
    date: "",
    // TODO: uncomment till line 14
    // file: null,
    // comment: '',
    // approval: ''
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
  }, [])


    function formatDate(date) {
        const newDate = new Date(date);
        const simpleDate = newDate.toISOString().split('T')[0];
        return simpleDate;
    }




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
    // TODO: uncomment line 60 if the name field is needed
    // data.append('name', formData.name);
    data.append('amount', formData.amount);
    data.append('date', formData.date);
    data.append('reason', formData.reason);
    // TODO: uncomment line till 68 if the file fields are needed
    // data.append('file', formData.file);
    // data.append('comment', formData.comment);
    // data.append('approval', formData.approval);
    try {
      const response = await api.post('/api/requests', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full h-full flex-col">
  <h2 className="text-3xl font-bold mb-4 mt-10">Worker Page</h2>
  <form onSubmit={handleSubmit} className="p-4 my-6 mx-10 bg-white w-auto flex flex-col lg:flex-row">
    <div className="flex flex-col space-y-5 w-full">
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-7">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Please Enter Your Full name"
          value={formData.name}
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
          name="comment"
          value={formData.comment}
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
          <option value="approval1">Approval 1</option>
          <option value="approval2">Approval 2</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-2xl w-full mt-6">Send</button>
    </div>
  </form>
</div>

  );
};

export default WorkerPage;

