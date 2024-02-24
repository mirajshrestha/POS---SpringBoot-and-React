import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardTab from './DashboardTab';
import ProfileTab from './ProfileTab';
import ProductTab from './ProductTab';
import CartTab from './CartTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('cashier');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInCashier') !== null;
    if (!isAuthenticated) {
      navigate('/cashier/login');
    }
  }, [navigate]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/cashier/logout');
      sessionStorage.removeItem('loggedInCashier');
      navigate('/cashier/login');
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
                Cashier
              </Nav.Link>
              <hr className='text-secondary' />
              <Nav.Link eventKey="cashier" className="sidebar-link">
                <i className="bi bi-kanban-fill"></i> Dashboard
              </Nav.Link>
              <Nav.Link eventKey="product" className="sidebar-link">
                <i className="bi bi-box-seam-fill"></i> Product
              </Nav.Link>
              <Nav.Link eventKey="cart" className="sidebar-link">
                <i className="bi bi-cart"></i> Cart
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
              <Tab.Pane eventKey="cashier">
                <DashboardTab />
              </Tab.Pane>
              <Tab.Pane eventKey="product">
                <ProductTab />
              </Tab.Pane>
              <Tab.Pane eventKey="cart">
                <CartTab />
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

export default Dashboard;