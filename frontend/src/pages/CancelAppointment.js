// src/pages/CancelAppointment.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelAppointment, getPatientAppointments } from '../services/appointmentService';

const CancelAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await getPatientAppointments(1);
                const appt = response.data.find(a => a.id == id);
                if (appt && appt.status === 'Booked') {
                    setAppointment(appt);
                } else {
                    setError('Appointment not found or already cancelled.');
                }
            } catch (err) {
                setError('Failed to load appointment.');
            }
        };
        fetchAppointment();
    }, [id]);

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            setLoading(true);
            await cancelAppointment(id);
            navigate('/appointments', { state: { message: 'Appointment cancelled successfully.' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to cancel appointment.');
        } finally {
            setLoading(false);
        }
    };

    if (!appointment) return error ? <Alert variant="danger" className="mt-5 text-center">{error}</Alert> : null;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5" style={{ backgroundColor: '#F44336', color: 'white' }}>
                    Cancel Appointment
                </Card.Header>
                <Card.Body>
                    <h5>Are you sure you want to cancel this appointment?</h5>
                    <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                    <p><strong>Date & Time:</strong> {new Date(appointment.dateTime).toLocaleString()}</p>
                    <p><strong>Hospital:</strong> {appointment.hospitalName}</p>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
                            Go Back
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            {loading ? 'Cancelling...' : 'Yes, Cancel'}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CancelAppointment;
