// src/pages/BookAppointment.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  getHospitals,
  getServiceTypes,
  getDoctors,
  bookAppointment
} from '../services/appointmentService';

const BookAppointment = ({ onNotify }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const patientId = 1; // Mock

    // Clear error when selections change
    const clearError = () => setError('');

    // Fetch hospitals
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                setLoading(true);
                const response = await getHospitals();
                setHospitals(response.data);
            } catch (err) {
                setError('Failed to load hospitals.');
            } finally {
                setLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    // Fetch service types
    useEffect(() => {
        if (selectedHospital) {
            clearError();
            const fetchServiceTypes = async () => {
                try {
                    setLoading(true);
                    const response = await getServiceTypes(selectedHospital.id);
                    setServiceTypes(response.data);
                } catch (err) {
                    setError('Failed to load service types.');
                } finally {
                    setLoading(false);
                }
            };
            fetchServiceTypes();
        }
    }, [selectedHospital]);

    // Fetch doctors
    useEffect(() => {
        if (selectedHospital && selectedServiceType) {
            clearError();
            const fetchDoctors = async () => {
                try {
                    setLoading(true);
                    const response = await getDoctors(selectedHospital.id, selectedServiceType.id);
                    setDoctors(response.data);
                } catch (err) {
                    setError('Failed to load doctors.');
                } finally {
                    setLoading(false);
                }
            };
            fetchDoctors();
        }
    }, [selectedHospital, selectedServiceType]);

    // Generate slots ONLY for days the doctor is available
    useEffect(() => {
        if (selectedDoctor) {
            clearError();
            const slots = [];
            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
                // ✅ Only include days the doctor is available
                if (selectedDoctor.availableDays.includes(dayName)) {
                    slots.push({
                        date: date.toISOString().split('T')[0],
                        times: ['09:00', '10:00', '11:00', '14:00', '15:00']
                    });
                }
            }
            setAvailableSlots(slots);
        }
    }, [selectedDoctor]);

    const handleSlotSelect = (date, time) => {
        setSelectedSlot({ date, time });
        clearError(); // Clear error when slot is selected
    };

    const handleBook = async () => {
        if (!selectedSlot) {
            setError('Please select a time slot.');
            return;
        }

        try {
            setLoading(true);
            const dateTime = `${selectedSlot.date}T${selectedSlot.time}:00`;
            await bookAppointment({
                patientId,
                doctorId: selectedDoctor.id,
                hospitalId: selectedHospital.id,
                serviceTypeId: selectedServiceType.id,
                dateTime
            });

            const message = `Your appointment is confirmed for ${selectedSlot.date} at ${selectedSlot.time}!`;
            if (onNotify) onNotify(message);
            setStep(5);
        } catch (err) {
            // ✅ Show exact backend error message
            const errorMessage = err.response?.data?.message || 'This slot is alreay booked.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <Card>
            <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>
                Step 1: Select Hospital
            </Card.Header>
            <Card.Body>
                {loading ? <Spinner animation="border" /> : error ? <Alert variant="danger">{error}</Alert> : (
                    <Row>
                        {hospitals.map(h => (
                            <Col key={h.id} md={4} className="mb-3">
                                <Card
                                    onClick={() => {
                                        setSelectedHospital(h);
                                        clearError();
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        border: selectedHospital?.id === h.id ? '2px solid #1E88E5' : '1px solid #dee2e6'
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>{h.name}</Card.Title>
                                        <Card.Text>{h.address}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                <Button
                    variant="primary"
                    onClick={() => selectedHospital ? setStep(2) : setError('Please select a hospital.')}
                    disabled={!selectedHospital}
                    style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                    className="mt-3"
                >
                    Next: Select Service Type
                </Button>
            </Card.Body>
        </Card>
    );

    const renderStep2 = () => (
        <Card>
            <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>
                Step 2: Select Service Type
            </Card.Header>
            <Card.Body>
                {loading ? <Spinner animation="border" /> : error ? <Alert variant="danger">{error}</Alert> : (
                    <Row>
                        {serviceTypes.map(s => (
                            <Col key={s.id} md={6} className="mb-3">
                                <Card
                                    onClick={() => {
                                        setSelectedServiceType(s);
                                        clearError();
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        border: selectedServiceType?.id === s.id ? '2px solid #1E88E5' : '1px solid #dee2e6'
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>{s.name}</Card.Title>
                                        <Card.Text>{s.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                <div className="mt-3">
                    <Button variant="secondary" onClick={() => setStep(1)} className="me-2">Back</Button>
                    <Button
                        variant="primary"
                        onClick={() => selectedServiceType ? setStep(3) : setError('Please select a service type.')}
                        disabled={!selectedServiceType}
                        style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                    >
                        Next: Select Doctor
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );

    const renderStep3 = () => (
        <Card>
            <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>
                Step 3: Select Doctor
            </Card.Header>
            <Card.Body>
                {loading ? <Spinner animation="border" /> : error ? <Alert variant="danger">{error}</Alert> : (
                    <Row>
                        {doctors.map(d => (
                            <Col key={d.id} md={4} className="mb-3">
                                <Card
                                    onClick={() => {
                                        setSelectedDoctor(d);
                                        clearError();
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        border: selectedDoctor?.id === d.id ? '2px solid #1E88E5' : '1px solid #dee2e6'
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>{d.name}</Card.Title>
                                        <Card.Subtitle className="text-muted">{d.specialization}</Card.Subtitle>
                                        <Card.Text>
                                            <strong>Hospital:</strong> {d.hospital.name}<br />
                                            <strong>Available Days:</strong> {d.availableDays.join(', ')}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                <div className="mt-3">
                    <Button variant="secondary" onClick={() => setStep(2)} className="me-2">Back</Button>
                    <Button
                        variant="primary"
                        onClick={() => selectedDoctor ? setStep(4) : setError('Please select a doctor.')}
                        disabled={!selectedDoctor}
                        style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                    >
                        Next: Select Time Slot
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );

    const renderStep4 = () => (
        <Card>
            <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>
                Step 4: Select Time Slot
            </Card.Header>
            <Card.Body>
                {loading ? <Spinner animation="border" /> : error ? <Alert variant="danger">{error}</Alert> : (
                    <>
                        <h6>Select a date and time:</h6>
                        {availableSlots.length > 0 ? (
                            availableSlots.map((slot, idx) => (
                                <div key={idx} className="mb-3">
                                    <h6>{new Date(slot.date).toLocaleDateString()}</h6>
                                    <Row>
                                        {slot.times.map(time => {
                                            const isSelected = selectedSlot?.date === slot.date && selectedSlot?.time === time;
                                            return (
                                                <Col key={time} xs={6} sm={4} md={3} className="mb-2">
                                                    <Button
                                                        variant={isSelected ? "success" : "outline-secondary"}
                                                        onClick={() => handleSlotSelect(slot.date, time)}
                                                        style={{
                                                            width: '100%',
                                                            backgroundColor: isSelected ? '#4CAF50' : 'transparent',
                                                            borderColor: isSelected ? '#4CAF50' : '#dee2e6',
                                                            color: isSelected ? 'white' : 'black'
                                                        }}
                                                    >
                                                        {time}
                                                    </Button>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No available slots for this doctor in the next 7 days.</p>
                        )}
                    </>
                )}
                <div className="mt-3">
                    <Button variant="secondary" onClick={() => setStep(3)} className="me-2">Back</Button>
                    <Button
                        variant="primary"
                        onClick={handleBook}
                        disabled={!selectedSlot}
                        style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );

    const renderStep5 = () => (
        <Card>
            <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>
                Appointment Confirmed!
            </Card.Header>
            <Card.Body className="text-center">
                <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
                <h4>Your appointment is confirmed!</h4>
                <p>Your appointment details have been sent to your notification center.</p>
                <Button
                    variant="primary"
                    onClick={() => navigate('/')}
                    style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5', color: 'white' }}
                >
                    Return to Dashboard
                </Button>
            </Card.Body>
        </Card>
    );

    return (
        <Container className="mt-4">
            <h2 className="mb-4" style={{ color: '#212529' }}>Book an Appointment</h2>

            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}

            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <Spinner animation="border" />
                </div>
            )}
        </Container>
    );
};

export default BookAppointment;