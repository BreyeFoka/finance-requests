import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Setup axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // }
});


// Add a request interceptor to include the token
api.interceptors.request.use(config => {
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IndvcmtlciIsImlhdCI6MTcyMDg2MzQwOX0.53EYWamQ6NsnE-DKJV-WCWbgLMQUSFa9PyRf6l0qpNM";
  if (token) {
      config.headers['Authorization'] = token;
  }
  return config;
});

