
import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const ManagerDashboard = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: ''});

  useEffect(() => {
    // Fetch approved requests
    const fetchApprovedRequests = async () => {
      try {
        const response = await api.get('/api/requests');
        setApprovedRequests(response.data);
      } catch (error) {
        console.error('Error fetching approved requests:', error);
      }
    };

    // Fetch employees
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchApprovedRequests();
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/employees', newEmployee);
      if (response.data) {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        setNewEmployee({ name: '', email: '', role: ''});
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleRemoveEmployee = async (id) => {
    try {
      const response = await api.delete(`/api/employees/${id}`);
      if (response.data) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      } else {
        alert('Failed to remove employee');
      }
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/api/export/export-approved-requests', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'approved_requests.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting approved requests:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Approved Requests</h2>
        <ul className="space-y-2">
          {approvedRequests.filter(request => request.status === 'approved').map((request) => (
            <li key={request.id} className="p-4 bg-gray-100 rounded shadow">
              <div><strong>Name:</strong> {request.name}</div>
              <div><strong>Amount:</strong> {request.amount}</div>
              <div><strong>Reason:</strong> {request.reason}</div>
              <div><strong>Date:</strong> {request.date}</div>
            </li>
          ))}
        </ul>
        <button onClick={handleExport} className="btn btn-primary mt-4">Export Approved Requests</button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Employees</h2>
        <div className="mb-4">
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newEmployee.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
            <select
              name="role"
              value={newEmployee.role}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>Select Role</option>
              <option value="worker">Worker</option>
              <option value="accountant">Accountant</option>
            </select>
            <button type="submit" className="btn btn-primary w-full">Add Employee</button>
          </form>
        </div>
        <ul className="space-y-2">
          {employees.map((employee) => (
            <li key={employee.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
              <div>
                <div><strong>Name:</strong> {employee.name}</div>
                <div><strong>Email:</strong> {employee.email}</div>
                <div><strong>Role:</strong> {employee.role}</div>
              </div>
              <button onClick={() => handleRemoveEmployee(employee.id)} className="btn btn-danger">Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerDashboard;
