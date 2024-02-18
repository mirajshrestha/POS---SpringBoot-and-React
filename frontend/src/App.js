import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/SuperAdmin/Login';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminLogin from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import AdminRegister from './components/Admin/Register';
import CashierLogin from './components/Cashier/Login';
import ManagerLogin from './components/Manager/Login';
import ManagerDashboard from './components/Manager/Dashboard';
import ManagerRegister from './components/Manager/Register';
import CashierDashboard from './components/Cashier/Dashboard';
import CashierRegister from './components/Cashier/Register';


function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   sessionStorage.getItem('loggedInUser') !== null,
  // );


  return (
    <div>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          {/* Super Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sadmin/dashboard" element={<SuperAdminDashboard />} />

          {/* Admin Routes */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/register' element={<AdminRegister />} />

          {/* Manager Routes */}
          <Route path='/manager/login' element={<ManagerLogin />} />
          <Route path='/manager/dashboard' element={<ManagerDashboard />} />
          <Route path='/manager/register' element={<ManagerRegister />} />

          {/* Cashier Routes */}
          <Route path='/cashier/login' element={<CashierLogin />} />
          <Route path='/cashier/dashboard' element={<CashierDashboard />} />
          <Route path='/cashier/register' element={<CashierRegister />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
