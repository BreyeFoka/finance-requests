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
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJ3b3JrZXIiLCJpYXQiOjE3MjA4MDkxODJ9.WexydO42ggopHAGqUYcDxhF-1EBRph6tYFq83DzyrfY";
  if (token) {
      config.headers['Authorization'] = token;
  }
  return config;
});

