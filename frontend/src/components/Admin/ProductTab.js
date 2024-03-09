import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ProductTab = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [editProductName, setEditProductName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editProductImage, setEditProductImage] = useState(null);

  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    quantity: '',
    brand: '',
    productImage: null,
  });

  const [editProductData, setEditProductData] = useState({
    id: null,
    productName: '',
    price: '',
    quantity: '',
    productImage: null,
  });

  const [products, setProducts] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setProductData({
      productName: '',
      price: '',
      quantity: '',
      brand: '',
      productImage: null,
    });
  }

  const handleOpenEditModal = (row) => {
    setEditModalVisible(true);
    setEditProductName(row.name);
    setEditPrice(row.price);
    setEditQuantity(row.quantity);
    setEditProductImage(null);
    setEditProductData({
      id: row.id,
      productName: row.name,
      price: row.price,
      quantity: row.quantity,
      productImage: null,
    });
  }

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setEditProductName('');
    setEditPrice('');
    setEditQuantity('');
    setEditProductImage(null);
    setEditProductData({
      id: null,
      productName: '',
      price: '',
      quantity: '',
      productImage: null,
    });
  }

  const handleEditProduct = async () => {
    try {
      const updatedProductData = {
        name: editProductName,
        price: editPrice,
        quantity: editQuantity,
      };

      const formData = new FormData();
      formData.append('image', editProductImage);
      formData.append('product', new Blob([JSON.stringify(updatedProductData)], { type: 'application/json' }));

      await axios.put(`/api/product/update/${editProductData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Close the edit modal and refresh the product list
      handleCloseEditModal();
      fetchProducts();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  }

  const handleAddProduct = async () => {
    console.log('Adding product:', productData);
    try {
      const formData = new FormData();
      formData.append('image', productData.productImage);
      formData.append('product', new Blob([JSON.stringify({
        name: productData.productName,
        price: productData.price,
        quantity: productData.quantity,
        brand: productData.brand,

      })], { type: "application/json" }));
      formData.append('categoryId', productData.categoryId);
      formData.append('subCategoryId', productData.subCategoryId);
      const response = await axios.post('/api/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });
      console.log('Product added:', response.data);
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productImage') {
      setProductData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product/admin');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category/all');
      setCategories(response.data);
      console.log("Categories: ", response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    try {
      const response = await axios.get(`/api/category/sub/${categoryId}`);
      setSubCategories(response.data);
      console.log("Sub Categories: ", response.data);

    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // fetchCategories();

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`);
      alert('Product successfully deleted');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting Product: ', error);
    }
  }

  const columns = [
    {
      dataField: 'id',
      text: '#',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      headerStyle: { cursor: 'pointer' },
    },
    {
      dataField: 'img',
      text: 'Product Image',
      formatter: (cell, row) => (
        <img
          src={`http://localhost:8080/api/images/${cell}`}
          style={{ width: '80px', height: '75px' }}
          alt={row.name}
        />
      ),
    },
    {
      dataField: 'name',
      // text: 'Name',
      filter: textFilter({
        placeholder: 'Search by name',
      }),
      sort: true,
      headerStyle: { cursor: 'pointer' },
    },
    {
      dataField: 'price',
      text: 'Price',
      // filter: textFilter(),
      sort: true,
      headerStyle: { cursor: 'pointer' },
    },
    {
      dataField: 'quantity',
      text: 'Quantity',
      // filter: textFilter(),
      sort: true,
      headerStyle: { cursor: 'pointer' },
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: (cell, row) => (
        <>
          <Button
            variant="secondary"
            className="mt-auto"
            onClick={() => handleOpenEditModal(row)}
          >
            <i className="bi bi-pencil-fill"></i> Edit
          </Button>{' '}
          <Button
            variant="danger"
            className="mt-auto"
            onClick={() => handleDeleteProduct(row.id)}
          >
            <i className="bi bi-trash3"></i> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <h3>Products | <Button variant="primary" onClick={handleOpenModal}>
        Add Product
      </Button>
      </h3>
      <hr />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productImage">
              <Form.Label>Product Image:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="productImage"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="categoryId">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={productData.categoryId}
                onChange={(e) => {
                  handleChange(e);
                  handleCategoryChange(e.target.value);
                }}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="subCategoryId">
              <Form.Label>Subcategory:</Form.Label>
              <Form.Control
                as="select"
                name="subCategoryId"
                value={productData.subCategoryId}
                onChange={handleChange}
              >
                <option value="" disabled>Select a subcategory</option>
                {subCategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand: (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleAddProduct}>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={editModalVisible} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editProductName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={editProductName}
                onChange={(e) => setEditProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editQuantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editProductImage">
              <Form.Label>Product Image:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="editProductImage"
                onChange={(e) => setEditProductImage(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEditProduct}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:8080/api/images/${product.img}`}
                  style={{ width: '80px', height: '75px' }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <Button variant="secondary" className="mt-auto" onClick={() => handleOpenEditModal(product)}>
                  <i className="bi bi-pencil-fill"></i> Edit
                </Button> <Button variant="danger" className="mt-auto" onClick={() => handleDeleteProduct(product.id)}>
                  <i className="bi bi-trash3"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        pagination={paginationFactory()}
        filter={filterFactory({ withoutEmptyColumnFilter: true })}
      />
    </div>
  )
}

export default ProductTab;