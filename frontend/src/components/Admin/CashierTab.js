import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';

const CashierTab = () => {
    const [cashiers, setCashiers] = useState([]);
    const [activeCashier, setActiveCashiers] = useState([]);
    const [inactiveCashier, setInactiveCashiers] = useState([]);

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            const response = await axios.get('/api/cashier/allCashier');
            setCashiers(response.data);

            const activeCashier = response.data.filter(cashier => cashier.status === 'active');
            const inactiveCashier = response.data.filter(cashier => cashier.status === 'inactive');
            setActiveCashiers(activeCashier);
            setInactiveCashiers(inactiveCashier);
            console.log("Active: ", activeCashier);
            console.log("Inactive: ", inactiveCashier);
        } catch (error) {
            console.error('Error fetching cashier ', error);
        }
    }

    const handleAddCashier = async () => {
        try {
            const response = await axios.post('/api/cashier/generateRandomCashier');
            alert(`Generated Cashier\nUsername: ${response.data.username}\nPassword: ${response.data.password}`);
            window.location.reload();
        } catch (error) {
            console.error('Error generating Cashier: ', error);
        }
    }

    const handleDeleteCashier = async (cashierId) => {
        try {
            await axios.delete(`/api/cashier/${cashierId}`);
            alert('Cashier deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting Cashier: ', error);
        }
    }

    return (
        <div className="mt-4">
            <h3>Cashier Panel | <Button variant="primary" className="mt-auto" onClick={handleAddCashier}>
                <i className="bi bi-plus"></i> Cashier
            </Button></h3>

            <hr />
            <h4>Active Cashier</h4>
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
                    {activeCashier.map((cashier, index) => (
                        <tr key={cashier.id}>
                            <td>{index + 1}</td>
                            <td>{cashier.full_name}</td>
                            <td>{cashier.username}</td>
                            <td>{cashier.email}</td>
                            <td>{cashier.contact}</td>
                            <td><Button variant="danger" className="mt-auto" onClick={() => handleDeleteCashier(cashier.id)}>
                                <i class="bi bi-trash3"></i> Delete
                            </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <hr />
            <h4>Inactive Cashier</h4>
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
                    {inactiveCashier.map((cashier, index) => (
                        <tr key={cashier.id}>
                            <td>{index + 1}</td>
                            <td>{cashier.username}</td>
                            <td>{cashier.password}</td>
                            <td>{cashier.status}</td>
                            <td><Button variant="danger" className="mt-auto" onClick={() => handleDeleteCashier(cashier.id)}>
                                <i class="bi bi-trash3"></i> Delete
                            </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default CashierTab