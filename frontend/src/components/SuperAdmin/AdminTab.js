import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';


const AdminTab = () => {
    const [admins, setAdmins] = React.useState([]);
    const [activeAdmins, setActiveAdmins] = useState([]);
    const [inactiveAdmins, setInactiveAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDeleteAdmin = async (adminId) => {
        try {
            await axios.delete(`/api/admin/${adminId}`);
            alert('Admin deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting admin: ', error);
        }
    }

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('/api/admin/allAdmins');
            setAdmins(response.data);

            const activeAdmins = response.data.filter(admin => admin.status === 'active');
            const inactiveAdmins = response.data.filter(admin => admin.status === 'inactive');
            setActiveAdmins(activeAdmins);
            setInactiveAdmins(inactiveAdmins);
            console.log("Active: ", activeAdmins);
            console.log("Inactive: ", inactiveAdmins);
        } catch (error) {
            console.error('Error fetching admins ', error);
        }
    }

    const handleAddAdmin = async () => {
        try {
            const response = await axios.post('/api/admin/generateRandomAdmin');
            alert(`Generated Admin\nUsername: ${response.data.username}\nPassword: ${response.data.password}`);
            window.location.reload();
        } catch (error) {
            console.error('Error generating admin: ', error);
        }
    }
    return (
        <div className="mt-4">
            <h3>Admin Panel | <Button variant="primary" className="mt-auto" onClick={handleAddAdmin}>
                <i className="bi bi-plus"></i> Admin
            </Button></h3>

            <hr />
            <h4>Active Admins</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activeAdmins.map((admin, index) => (
                        <tr key={admin.id}>
                            <td>{index + 1}</td>
                            <td>{admin.full_name}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.contact}</td>
                            <td><Button variant="danger" className="mt-auto" onClick={() => handleDeleteAdmin(admin.id)}>
                                <i class="bi bi-trash3"></i> Delete
                            </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <hr />
            <h4>Inactive Admins</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inactiveAdmins.map((admin, index) => (
                        <tr key={admin.id}>
                            <td>{index + 1}</td>
                            <td>{admin.username}</td>
                            <td>{admin.password}</td>
                            <td>{admin.status}</td>
                            <td><Button variant="danger" className="mt-auto" onClick={() => handleDeleteAdmin(admin.id)}>
                                <i class="bi bi-trash3"></i> Delete
                            </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AdminTab