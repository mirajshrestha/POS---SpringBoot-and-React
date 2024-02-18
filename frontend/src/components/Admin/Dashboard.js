import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagersTab from './ManagersTab';
import CashierTab from './CashierTab';
import ProfileTab from './ProfileTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('managers');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInAdmin') !== null;
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/admin/logout');
      sessionStorage.removeItem('loggedInAdmin');
      navigate('/admin/login');
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  }
  return (
    <Container fluid>
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          <Col sm={3} md={2} className="bg-light sidebar">
            <Nav className="flex-column">
              <Nav.Link className='sidebar-link super-admin'>
                Admin
              </Nav.Link>
              <hr className='text-secondary' />
              <Nav.Link eventKey="managers" className="sidebar-link">
                <i className="bi bi-people"></i> Managers
              </Nav.Link>
              <Nav.Link eventKey="cashier" className="sidebar-link">
                <i className="bi bi-cash"></i> Cashier
              </Nav.Link>
              <Nav.Link eventKey="profile" className="sidebar-link">
                <i className="bi bi-person"></i> Profile
              </Nav.Link>
            </Nav>

            <Button variant="danger" className="mt-auto" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </Button>

          </Col>
          <Col sm={9} md={10} className="main-content">
            <Tab.Content>
              <Tab.Pane eventKey="managers">
                <ManagersTab />
              </Tab.Pane>
              <Tab.Pane eventKey="cashier">
                <CashierTab />
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <ProfileTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>

  )
}

export default Dashboard