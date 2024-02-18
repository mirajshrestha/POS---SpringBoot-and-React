import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('loggedInCashier') !== null;
        if (!isAuthenticated) {
          navigate('/cashier/login');
        }
      }, [navigate]);

    const [cashierDetails, setCashierDetails] = useState(null);

    const [updatedCashier, setUpdatedCashier ] = useState({
        full_name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        contact: '',
      });

      useEffect(() => {
        axios.get('/api/cashier/me')
          .then(response => setCashierDetails(response.data))
          .catch(error => console.error('Error fetching cashier details:', error))
      }, []);

      const handleUpdate = () => {
        if (updatedCashier.password !== updatedCashier.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
    
        const updatedCashierDetails = {
          id: cashierDetails.id,
          full_name: updatedCashier.full_name,
          email: updatedCashier.email,
          username: updatedCashier.username,
          password: updatedCashier.password,
          contact: updatedCashier.contact,
        };
    
        axios.put('/api/cashier/update', updatedCashierDetails)
          .then(response => {
            alert("Details imported successfully");
            navigate('/cashier/dashboard');
          })
      }

    return (
        <Card style={{ width: '24rem', margin: 'auto', marginTop: '50px' }} className="shadow">
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>Update Details to Proceed</Card.Title>
                {/* Id no: {cashierDetails ? cashierDetails.id : 'Loading...'} */}
                <hr className='text-secondary' />
                <Form style={{ width: '100%' }}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        {/* <Form.Label>ID:</Form.Label> */}
                        <Form.Control
                            type="hidden"
                            placeholder="Enter your id"
                            value={cashierDetails ? cashierDetails.id : 'Loading...'}
                        // onChange={(e) => setUsername(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Name"
                            value={updatedCashier.full_name}
                            onChange={(e) => setUpdatedCashier({ ...updatedCashier, full_name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Email"
                            value={updatedCashier.email}
                            onChange={(e) => setUpdatedCashier({ ...updatedCashier, email: e.target.value })}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={updatedCashier.username}
                            onChange={(e) => setUpdatedCashier({ ...updatedCashier, username: e.target.value })}

                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Reset Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={updatedCashier.password}
                            onChange={(e) => setUpdatedCashier({ ...updatedCashier, password: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={updatedCashier.confirmPassword}
                            onChange={(e) => setUpdatedCashier({ ...updatedCashier, confirmPassword: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Contact:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your contact number"
                            value={updatedCashier.contact}
                            onChange={(e) => setUpdatedCashier({ ...updatedCashier, contact: e.target.value })}
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