import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Table, Card, Collapse } from 'react-bootstrap';

const ProductCategory = () => {
    const [iconClass, setIconClass] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [subcategories, setSubcategories] = useState({});
    const [showSubcategoryModal, setShowSubcategoryModal] = React.useState(false);
    const componentRef = React.useRef();

    const [categoryData, setCategoryData] = React.useState({
        name: '',
    });

    const [subCategoryData, setSubCategoryData] = React.useState({
        name: '',
        parentCategoryId: null,
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/category/all');
            setCategories(response.data);
            setIconClass(response.data.map(() => 'bi bi-caret-right'));
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

    const handleOpenSubcategoryModal = (categoryId) => {
        setShowSubcategoryModal(true);
        setSubCategoryData({
            name: '',
            parentCategoryId: categoryId,
        });
    }

    const handleCloseSubcategoryModal = () => {
        setShowSubcategoryModal(false);
        setSubCategoryData({
            name: '',
            parentCategoryId: null,
        });
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

    const handleSubmitSubcategory = async () => {
        console.log("Adding subcategory", subCategoryData);
        try {
            const response = await axios.post('/api/category/sub/add', subCategoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Added subcategory", response.data);
            handleCloseSubcategoryModal();
            fetchCategories();
        } catch (error) {
            console.error('Error adding subcategory:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubcategoryChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryData((prevData) => ({
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

    const handleDeleteSubCategory = async (subCategoryId) => {
        try {
            await axios.delete(`/api/category/sub/delete/${subCategoryId}`);
            console.log("Deleted category");
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    const handleCardToggle = (index) => {
        const newIconClasses = [...iconClass];
        newIconClasses[index] = newIconClasses[index] === 'bi bi-caret-right' ? 'bi bi-caret-down' : 'bi bi-caret-right';
        setIconClass(newIconClasses);
        const categoryId = categories[index].id;
        if (newIconClasses[index] === 'bi bi-caret-down') {
            fetchSubcategories(categoryId);
        } else {
            setSubcategories((prevSubcategories) => {
                const updatedSubcategories = { ...prevSubcategories };
                delete updatedSubcategories[categoryId];
                return updatedSubcategories;
            });
        }
    }

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`/api/category/sub/${categoryId}`);
            setSubcategories((prevSubcategories) => ({
                ...prevSubcategories,
                [categoryId]: response.data,
            }));
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

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

            <Modal show={showSubcategoryModal} onHide={handleCloseSubcategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subcategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">

                            <Form.Label>Subcategory Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subcategory name"
                                name="name"
                                value={subCategoryData.name}
                                onChange={(e) => setSubCategoryData({ ...subCategoryData, name: e.target.value })}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="parentCategoryId">
                            <Form.Label>Parent Category ID:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Parent Category ID"
                                name="parentCategoryId"
                                value={subCategoryData.parentCategoryId}
                                readOnly
                            ></Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmitSubcategory}>
                            Add Subcategory
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {categories.map((category, index) => (
                <div key={index}>
                    <Card>
                        <Card.Header style={{ cursor: 'pointer' }}>
                            <div className='d-flex justify-content-between align-items-center' onClick={() => { handleCardToggle(index) }}>
                                <span>{category.name}</span>
                                <i className={iconClass[index]} onClick={() => { handleCardToggle(index) }}></i>
                            </div>
                        </Card.Header>

                        <Collapse in={iconClass[index] === 'bi bi-caret-down'}>
                            <Card.Body ref={componentRef}>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subcategories[category.id]?.map((subcategory, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{subcategory.name}</td>
                                                <td>
                                                    <Button variant="danger" onClick={() => handleDeleteSubCategory(subcategory.id)}>Remove</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button onClick={() => handleOpenSubcategoryModal(category.id)}>
                                    Add Sub-Category
                                </Button>  <Button variant="danger" onClick={() => handleDelete(category.id)}>
                                    Delete Category
                                </Button>
                            </Card.Body>
                        </Collapse>
                    </Card>
                    <br />
                </div>
            ))}

        </div >
    )
}

export default ProductCategory;