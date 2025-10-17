// src/services/appointmentService.js
import axios from 'axios';

const API_BASE_URL = '/api/appointments';

export const getHospitals = () => axios.get(`${API_BASE_URL}/hospitals`);
export const getServiceTypes = (hospitalId) => axios.get(`${API_BASE_URL}/service-types/hospital/${hospitalId}`);
export const getDoctors = (hospitalId, serviceTypeId) => axios.get(`${API_BASE_URL}/doctors/hospital/${hospitalId}/service/${serviceTypeId}`);
export const bookAppointment = (data) => axios.post(`${API_BASE_URL}/book`, data);
export const rescheduleAppointment = (id, data) => axios.put(`${API_BASE_URL}/reschedule/${id}`, data);
export const cancelAppointment = (id) => axios.delete(`${API_BASE_URL}/cancel/${id}`);
export const getPatientAppointments = (patientId) => axios.get(`${API_BASE_URL}/patient/${patientId}`);
