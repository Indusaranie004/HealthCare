// src/pages/ViewAppointments.js
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getPatientAppointments } from '../services/appointmentService';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const patientId = 1; // Mock

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getPatientAppointments(patientId);
                setAppointments(response.data);
            } catch (err) {
                setError('Failed to load appointments.');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const getStatusVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'booked': return 'success';
            case 'rescheduled': return 'warning';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

    return (
        <Container className="mt-4">
            <h2 className="mb-4">My Appointments</h2>
            {appointments.length === 0 ? (
                <Card>
                    <Card.Body>
                        <p className="text-center">No appointments found.</p>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                onClick={() => navigate('/book')}
                                style={{ 
                                    backgroundColor: '#1E88E5', 
                                    borderColor: '#1E88E5', 
                                    color: 'white' 
                                }}
                            >
                                Book an Appointment
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {appointments.map(appt => (
                        <ListGroup.Item key={appt.id} className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{appt.doctorName}</div>
                                <small>{appt.hospitalName} • {appt.serviceTypeName}</small><br />
                                <small>
                                    {new Date(appt.dateTime).toLocaleDateString()} at {new Date(appt.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </small>
                            </div>
                            <Badge bg={getStatusVariant(appt.status)} pill>
                                {appt.status}
                            </Badge>
                            {/* ✅ Show buttons for Booked AND Rescheduled */}
                            {appt.status !== 'Cancelled' && (
                                <div className="mt-2">
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        className="me-2"
                                        style={{ 
                                            backgroundColor: '#1E88E5', 
                                            borderColor: '#1E88E5', 
                                            color: 'white' 
                                        }}
                                        onClick={() => navigate(`/reschedule/${appt.id}`)}
                                    >
                                        Reschedule
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        style={{ 
                                            backgroundColor: '#F44336', 
                                            borderColor: '#F44336', 
                                            color: 'white' 
                                        }}
                                        onClick={() => navigate(`/cancel/${appt.id}`)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default ViewAppointments;