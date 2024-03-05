import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap';

const ProductCategory = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = React.useState(false);

    const [categoryData, setCategoryData] = React.useState({
        name: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/category/all');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setCategoryData({
            name: '',
        })
    }

    const handleSubmit = async () => {
        console.log("Adding category", categoryData);
        try {
            const response = await axios.post('/api/category/add', categoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Added category", response.data);
            handleCloseModal();
            fetchCategories();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`/api/category/delete/${categoryId}`);
            console.log("Deleted category");
            fetchCategories(); 
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    return (
        <div className="mt-4">
            <h3>Categories | <Button variant="primary" className="mt-auto" onClick={handleOpenModal}>
                <i className="bi bi-plus"></i> Category
            </Button></h3>
            <hr />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                name="name"
                                value={categoryData.name}
                                onChange={handleChange}
                            ></Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(category.id)}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    )
}

export default ProductCategory;