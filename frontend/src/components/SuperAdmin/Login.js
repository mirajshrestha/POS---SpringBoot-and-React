import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuperAdminDashboard from './SuperAdminDashboard';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/superadmin/login', {
                username,
                password,
            });
            alert(response.data);
            // onLogin(response.data);
            if (response.data === 'Login successful') {
                // Redirect to SuperAdminDashboard
                sessionStorage.setItem('loggedInUser', JSON.stringify(response.user));
                navigate('/sadmin/dashboard');
            }
        } catch (error) {
            console.error('Error during Login: ', error);
            alert('Invalid credentials');
        }
    };

    return (
        <Card style={{ width: '24rem', margin: 'auto', marginTop: '50px' }} className="shadow">
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>Login</Card.Title>
                <Form style={{ width: '100%' }}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>

    )
}

export default Login