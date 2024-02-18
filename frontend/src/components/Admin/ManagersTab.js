import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';


const ManagersTab = () => {
    const [managers, setManagers] = React.useState([]);
    const [activeManagers, setActiveManagers] = useState([]);
    const [inactiveManagers, setInactiveManagers] = useState([]);

    useEffect(() => {
        fetchManagers();
    }, []);

    const handleDeleteManager = async (managerId) => {
        try {
            await axios.delete(`/api/manager/${managerId}`);
            alert('Manager deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting Manager: ', error);
        }
    }

    const fetchManagers = async () => {
        try {
            const response = await axios.get('/api/manager/allManagers');
            setManagers(response.data);

            const activeManagers = response.data.filter(manager => manager.status === 'active');
            const inactiveManagers = response.data.filter(manager => manager.status === 'inactive');
            setActiveManagers(activeManagers);
            setInactiveManagers(inactiveManagers);
            console.log("Active: ", activeManagers);
            console.log("Inactive: ", inactiveManagers);
        } catch (error) {
            console.error('Error fetching managers ', error);
        }
    }

    const handleAddManager = async () => {
        try {
            const response = await axios.post('/api/manager/generateRandomManager');
            alert(`Generated Manager\nUsername: ${response.data.username}\nPassword: ${response.data.password}`);
            window.location.reload();
        } catch (error) {
            console.error('Error generating manager: ', error);
        }
    }
    return (
        <div className="mt-4">
            <h3>Manager Panel | <Button variant="primary" className="mt-auto" onClick={handleAddManager}>
                <i className="bi bi-plus"></i> Manager
            </Button></h3>

            <hr />
            <h4>Active Managers</h4>
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
                    {activeManagers.map((manager, index) => (
                        <tr key={manager.id}>
                            <td>{index + 1}</td>
                            <td>{manager.full_name}</td>
                            <td>{manager.username}</td>
                            <td>{manager.email}</td>
                            <td>{manager.contact}</td>
                            <td><Button variant="danger" className="mt-auto" onClick={() => handleDeleteManager(manager.id)}>
                                <i class="bi bi-trash3"></i> Delete
                            </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <hr />
            <h4>Inactive Managers</h4>
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
                    {inactiveManagers.map((manager, index) => (
                        <tr key={manager.id}>
                            <td>{index + 1}</td>
                            <td>{manager.username}</td>
                            <td>{manager.password}</td>
                            <td>{manager.status}</td>
                            <td><Button variant="danger" className="mt-auto" onClick={() => handleDeleteManager(manager.id)}>
                                <i class="bi bi-trash3"></i> Delete
                            </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ManagersTab