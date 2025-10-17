// src/pages/RescheduleAppointment.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getHospitals,
  getServiceTypes,
  getDoctors,
  rescheduleAppointment,
  getPatientAppointments
} from '../services/appointmentService';

const RescheduleAppointment = () => {
    const { id } = useParams();
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
    const [originalAppointment, setOriginalAppointment] = useState(null);

    // Fetch original appointment
    useEffect(() => {
        const fetchOriginal = async () => {
            try {
                const response = await getPatientAppointments(1);
                const appt = response.data.find(a => a.id == id);
                if (appt) setOriginalAppointment(appt);
                else setError('Appointment not found.');
            } catch (err) {
                setError('Failed to load appointment.');
            }
        };
        fetchOriginal();
    }, [id]);

    // Fetch hospitals
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await getHospitals();
                setHospitals(response.data);
            } catch (err) {
                setError('Failed to load hospitals.');
            }
        };
        if (originalAppointment) fetchHospitals();
    }, [originalAppointment]);

    // Fetch service types
    useEffect(() => {
        if (selectedHospital) {
            const fetchServiceTypes = async () => {
                try {
                    const response = await getServiceTypes(selectedHospital.id);
                    setServiceTypes(response.data);
                } catch (err) {
                    setError('Failed to load service types.');
                }
            };
            fetchServiceTypes();
        }
    }, [selectedHospital]);

    // Fetch doctors
    useEffect(() => {
        if (selectedHospital && selectedServiceType) {
            const fetchDoctors = async () => {
                try {
                    const response = await getDoctors(selectedHospital.id, selectedServiceType.id);
                    setDoctors(response.data);
                } catch (err) {
                    setError('Failed to load doctors.');
                }
            };
            fetchDoctors();
        }
    }, [selectedHospital, selectedServiceType]);

    // Generate slots
    useEffect(() => {
        if (selectedDoctor) {
            const slots = [];
            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
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
    };

    const handleReschedule = async () => {
        if (!selectedSlot) {
            setError('Please select a time slot.');
            return;
        }

        try {
            setLoading(true);
            const dateTime = `${selectedSlot.date}T${selectedSlot.time}:00`;
            await rescheduleAppointment(id, {
                doctorId: selectedDoctor.id,
                hospitalId: selectedHospital.id,
                serviceTypeId: selectedServiceType.id,
                dateTime
            });
            navigate('/appointments', { state: { message: 'Appointment rescheduled successfully!' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reschedule.');
        } finally {
            setLoading(false);
        }
    };

    if (!originalAppointment) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Reschedule Appointment</h2>
            <Card className="mb-4">
                <Card.Body>
                    <h5>Current Appointment</h5>
                    <p><strong>Doctor:</strong> {originalAppointment.doctorName}</p>
                    <p><strong>Date & Time:</strong> {new Date(originalAppointment.dateTime).toLocaleString()}</p>
                    <p><strong>Status:</strong> <span className="text-success">{originalAppointment.status}</span></p>
                </Card.Body>
            </Card>

            {/* Reuse same steps as booking */}
            {step === 1 && (
                <Card>
                    <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>Step 1: Select Hospital</Card.Header>
                    <Card.Body>
                        <Row>
                            {hospitals.map(h => (
                                <Col key={h.id} md={4} className="mb-3">
                                    <Card
                                        onClick={() => setSelectedHospital(h)}
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
                        <Button
                            variant="primary"
                            onClick={() => selectedHospital ? setStep(2) : setError('Please select a hospital.')}
                            disabled={!selectedHospital}
                            style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5' }}
                            className="mt-3"
                        >
                            Next
                        </Button>
                    </Card.Body>
                </Card>
            )}

            {step === 2 && (
                <Card>
                    <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>Step 2: Select Service Type</Card.Header>
                    <Card.Body>
                        <Row>
                            {serviceTypes.map(s => (
                                <Col key={s.id} md={6} className="mb-3">
                                    <Card
                                        onClick={() => setSelectedServiceType(s)}
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
                        <div className="mt-3">
                            <Button variant="secondary" onClick={() => setStep(1)} className="me-2">Back</Button>
                            <Button
                                variant="primary"
                                onClick={() => selectedServiceType ? setStep(3) : setError('Please select a service type.')}
                                disabled={!selectedServiceType}
                                style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5' }}
                            >
                                Next
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

            {step === 3 && (
                <Card>
                    <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>Step 3: Select Doctor</Card.Header>
                    <Card.Body>
                        <Row>
                            {doctors.map(d => (
                                <Col key={d.id} md={4} className="mb-3">
                                    <Card
                                        onClick={() => setSelectedDoctor(d)}
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
                        <div className="mt-3">
                            <Button variant="secondary" onClick={() => setStep(2)} className="me-2">Back</Button>
                            <Button
                                variant="primary"
                                onClick={() => selectedDoctor ? setStep(4) : setError('Please select a doctor.')}
                                disabled={!selectedDoctor}
                                style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5' }}
                            >
                                Next: Select Time Slot
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

            {step === 4 && (
                <Card>
                    <Card.Header as="h5" style={{ backgroundColor: '#1E88E5', color: 'white' }}>Step 4: Select New Time Slot</Card.Header>
                    <Card.Body>
                        <h6>Select a date and time:</h6>
                        {availableSlots.map((slot, idx) => (
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
                        ))}
                        <div className="mt-3">
                            <Button variant="secondary" onClick={() => setStep(3)} className="me-2">Back</Button>
                            <Button
                                variant="primary"
                                onClick={handleReschedule}
                                disabled={!selectedSlot}
                                style={{ backgroundColor: '#1E88E5', borderColor: '#1E88E5' }}
                            >
                                Confirm Reschedule
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {loading && <Spinner animation="border" className="mt-3" />}
        </Container>
    );
};

export default RescheduleAppointment;
