import axios from 'axios';
import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/manager/login', {
                username,
                password,
            });
            console.log(response.data);
            sessionStorage.setItem('loggedInManager', JSON.stringify(response.user));
            if (response.data === 'Login successful - active') {
                // alert("Dashboard");
                navigate('/manager/dashboard');
            } else if (response.data === 'Login successful - inactive') {
                // alert("Register");
                navigate('/manager/register');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during Login: ', error);
            alert('Invalid credentials');
        }
    }
    return (
        <Card style={{ width: '24rem', margin: 'auto', marginTop: '50px' }} className="shadow">
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>Manager Login</Card.Title>
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

export default Login;