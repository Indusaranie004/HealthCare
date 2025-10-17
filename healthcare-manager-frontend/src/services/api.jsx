// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Your Spring Boot base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const hospitalService = {
  getServices: () => api.get('/hospitals/services'),
  addHospital: (hospitalData) => api.post('/hospitals', hospitalData),
};

export const reportService = {
  getPatientReport: (hospitalId) => api.get(`/reports/patients?hospitalId=${hospitalId}`),
  getFinanceReport: (hospitalId) => api.get(`/reports/finance?hospitalId=${hospitalId}`),
  getPeakTimeReport: (hospitalId) => api.get(`/reports/peak-time?hospitalId=${hospitalId}`),
};