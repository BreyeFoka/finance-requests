// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});


// Register users

export const RegisterUser = async (newUser) => {
    try {
      const response = await api.post('/api/auth/register', newUser);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };


//   Login users
export const LoginUser = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token } = response.data;
      // Store the token
      localStorage.setItem('Authorization', token);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

//   create a money request

export const createRequest = async (newRequest) => {
    try {
      const response = await api.post('/api/requests', newRequest);
      return response.data;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  };


//   list requests
export const fetchRequests = async () => {
    try {
      const response = await api.get('/api/requests');
      return response.data;
    } catch (error) {
      console.error("Error fetching request:", error);
      throw error;
    }
  };
  
// update a request
export const updateRequest = async (id, updatedRequest) => {
    try {
      const response = await api.put(`/api/requests/${id}`, updatedRequest);
      return response.data;
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  };

// add user
export const AddrUser = async (newUser) => {
    try {
      const response = await api.post('/api/employees', newUser);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

// delete user
  export const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/employees/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  

