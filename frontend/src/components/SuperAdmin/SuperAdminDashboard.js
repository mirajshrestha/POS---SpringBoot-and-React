import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/SuperAdminDashboard.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTab from './AdminTab';
import ManagersTab from './ManagersTab';
import CashierTab from './CashierTab';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const isAuthenticated = sessionStorage.getItem('loggedInUser') !== null;

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  const handleLogout = async () => {
    try {
      await axios.get('/api/superadmin/logout');
      sessionStorage.removeItem('loggedInUser');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout: ', error);
    }

  };

  return (

    <Container fluid>
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          <Col sm={3} md={2} className="bg-light sidebar">
            <Nav className="flex-column">
              <Nav.Link className='sidebar-link super-admin'>
                SuperAdmin
              </Nav.Link>
              <hr className='text-secondary' />
              <Nav.Link eventKey="admin" className="sidebar-link">
                <i className="bi bi-person-fill"></i> Admin
              </Nav.Link>
              <Nav.Link eventKey="managers" className="sidebar-link">
                <i className="bi bi-people"></i> Managers
              </Nav.Link>
              <Nav.Link eventKey="cashier" className="sidebar-link">
                <i className="bi bi-cash"></i> Cashier
              </Nav.Link>
              
            </Nav>

            <Button variant="danger" className="mt-auto" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </Button>

          </Col>
          <Col sm={9} md={10} lg={10} className="main-content">
            <Tab.Content>
              <Tab.Pane eventKey="admin">
                <AdminTab />
              </Tab.Pane>
              <Tab.Pane eventKey="managers">
                <ManagersTab />
              </Tab.Pane>
              <Tab.Pane eventKey="cashier">
                <CashierTab />
              </Tab.Pane>
              
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>

  );
};

export default SuperAdminDashboard