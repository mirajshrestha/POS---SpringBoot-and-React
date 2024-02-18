import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('loggedInManager') !== null;
        if (!isAuthenticated) {
          navigate('/manager/login');
        }
      }, [navigate]);

    const [managerDetails, setManagerDetails] = useState(null);

    const [updatedManager, setUpdatedManager ] = useState({
        full_name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        contact: '',
      });

      useEffect(() => {
        axios.get('/api/manager/me')
          .then(response => setManagerDetails(response.data))
          .catch(error => console.error('Error fetching manager details:', error))
      }, []);

      const handleUpdate = () => {
        if (updatedManager.password !== updatedManager.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
    
        const updatedManagerDetails = {
          id: managerDetails.id,
          full_name: updatedManager.full_name,
          email: updatedManager.email,
          username: updatedManager.username,
          password: updatedManager.password,
          contact: updatedManager.contact,
        };
    
        axios.put('/api/manager/update', updatedManagerDetails)
          .then(response => {
            alert("Details imported successfully");
            navigate('/manager/dashboard');
          })
      }

    return (
        <Card style={{ width: '24rem', margin: 'auto', marginTop: '50px' }} className="shadow">
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>Update Details to Proceed</Card.Title>
                {/* Id no: {managerDetails ? managerDetails.id : 'Loading...'} */}
                <hr className='text-secondary' />
                <Form style={{ width: '100%' }}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        {/* <Form.Label>ID:</Form.Label> */}
                        <Form.Control
                            type="hidden"
                            placeholder="Enter your id"
                            value={managerDetails ? managerDetails.id : 'Loading...'}
                        // onChange={(e) => setUsername(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Name"
                            value={updatedManager.full_name}
                            onChange={(e) => setUpdatedManager({ ...updatedManager, full_name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Email"
                            value={updatedManager.email}
                            onChange={(e) => setUpdatedManager({ ...updatedManager, email: e.target.value })}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={updatedManager.username}
                            onChange={(e) => setUpdatedManager({ ...updatedManager, username: e.target.value })}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Reset Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={updatedManager.password}
                            onChange={(e) => setUpdatedManager({ ...updatedManager, password: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={updatedManager.confirmPassword}
                            onChange={(e) => setUpdatedManager({ ...updatedManager, confirmPassword: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Contact:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your contact number"
                            value={updatedManager.contact}
                            onChange={(e) => setUpdatedManager({ ...updatedManager, contact: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Register;