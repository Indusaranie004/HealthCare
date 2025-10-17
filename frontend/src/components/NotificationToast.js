// src/components/NotificationToast.js
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const NotificationToast = ({ show, onClose, message, variant }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={onClose} bg={variant} delay={5000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default NotificationToast;

