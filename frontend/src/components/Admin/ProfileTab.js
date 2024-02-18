import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const ProfileTab = () => {
    const [userData, setUserData] = useState({
        full_name: '',
        email: '',
        username: '',
        contact: '',
        password: '',
    });

    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('/api/admin/me');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching current user: ', error);
            }
        };
        fetchCurrentUser();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            await axios.put('/api/cashier/update', userData);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile: ', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleResetPassword = () => {
        setShowResetModal(true);
    };

    const handleCloseResetModal = () => {
        setShowResetModal(false);
    };

    return (
        <Card style={{ width: '24rem', margin: 'auto', marginTop: '50px' }} className="shadow">
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>Your Profile</Card.Title>
                <hr className="text-secondary" />
                <Form style={{ width: '100%' }}>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="full_name"
                            value={userData.full_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail" aria-readonly>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange} readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formContact">
                        <Form.Label>Contact:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your contact number"
                            name="contact"
                            value={userData.contact}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleUpdateProfile}>
                        Update Profile
                    </Button>

                    
                </Form>
            </Card.Body>

            
        </Card>
    )
}

export default ProfileTab;