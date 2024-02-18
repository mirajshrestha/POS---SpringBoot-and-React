import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInAdmin') !== null;
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);
  const [adminDetails, setAdminDetails] = useState(null);
  const [updatedAdmin, setUpdatedAdmin ] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    contact: '',
  });
  

  useEffect(() => {
    axios.get('/api/admin/me')
      .then(response => setAdminDetails(response.data))
      .catch(error => console.error('Error fetching admin details:', error))
  }, []);

  

  const handleUpdate = () => {
    if (updatedAdmin.password !== updatedAdmin.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updatedAdminDetails = {
      id: adminDetails.id,
      full_name: updatedAdmin.full_name,
      email: updatedAdmin.email,
      username: updatedAdmin.username,
      password: updatedAdmin.password,
      contact: updatedAdmin.contact,
    };

    axios.put('/api/admin/update', updatedAdminDetails)
      .then(response => {
        alert("Details imported successfully");
        navigate('/admin/dashboard');
      })
  }

  return (
    <Card style={{ width: '24rem', margin: 'auto', marginTop: '50px' }} className="shadow">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title>Update Details to Proceed</Card.Title>
        {/* Id no: {adminDetails ? adminDetails.id : 'Loading...'} */}
        <hr className='text-secondary' />
        <Form style={{ width: '100%' }}>
          <Form.Group className="mb-3" controlId="formUsername">
            {/* <Form.Label>ID:</Form.Label> */}
            <Form.Control
              type="hidden"
              placeholder="Enter your id"
              value={adminDetails ? adminDetails.id : 'Loading...'}
            // onChange={(e) => setUsername(e.target.value)}
            />
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
            value={updatedAdmin.full_name}
            onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, full_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Email"
            value={updatedAdmin.email}
            onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, email: e.target.value })}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
            value={updatedAdmin.username}
            onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, username: e.target.value })}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Reset Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
            value={updatedAdmin.password}
            onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
            value={updatedAdmin.confirmPassword}
            onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, confirmPassword: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Contact:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your contact number"
            value={updatedAdmin.contact}
            onChange={(e) => setUpdatedAdmin({ ...updatedAdmin, contact: e.target.value })}
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

export default Register