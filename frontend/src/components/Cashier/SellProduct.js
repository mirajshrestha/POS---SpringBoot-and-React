import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SellProduct = () => {
    const [productData, setProductData] = useState({
        barcode: '',
        productName: '',
        rate: '',
    });

    const [products, setProducts] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (productData.barcode) {
            // Fetch products with the provided ISBN number
            fetchProducts(productData.barcode);
        }
    }, [productData.barcode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
        console.log('Product data:', productData);
    };

    const handleClear = () => {
        setProductData({
            barcode: '',
            productName: '',
            rate: '',

        });
    };

    const fetchProducts = async (barcode) => {
        try {
            const response = await axios.get(`/api/product/${barcode}`);
            const fetchedProduct = response.data;

            // Update product data with fetched product details
            setProductData((prevData) => ({
                ...prevData,
                id: fetchedProduct.id,
                productName: fetchedProduct.name,
                rate: fetchedProduct.price,
                img: fetchedProduct.img,

            }));

            console.log('Fetched product:', response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        console.log(productId);
        try {
            const response = await axios.post('/api/cart/add', {
                productId: productId,
                quantity: 1,
            });
            
            alert(response.data);
            handleClear();
           
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };


    return (
        <div className="container mt-4">
            <h2>Sell Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="barcode">
                    <Form.Label>UPC, EAN, GTIN, or ISBN number:</Form.Label>
                    <Form.Control
                        type="text"
                        name="barcode"
                        value={productData.barcode}
                        onChange={handleChange}
                        placeholder="Enter barcode or ISBN"
                    />
                </Form.Group>

                <Form.Group controlId="productName">
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        disabled
                    />
                </Form.Group>

                <Form.Group controlId="rate">
                    <Form.Label>Rate:</Form.Label>
                    <Form.Control
                        type="text"
                        name="rate"
                        value={productData.rate}
                        onChange={handleChange}
                        placeholder="Enter rate"
                        disabled
                    />
                </Form.Group>

                <div className="mb-3">
                    <Form.Label>Product Image:</Form.Label>
                    <div>
                        <img
                            src={`http://localhost:8080/api/images/${productData.img}`}
                            style={{ width: '80px', height: '75px' }}
                            alt='image'
                        />

                    </div>
                </div>

                <Button variant="primary" onClick={() => handleAddToCart(productData.id)} >
                    Add
                </Button>
                <Button variant="secondary" className="ml-2" onClick={handleClear}>
                    Clear
                </Button>
            </Form>


        </div>
    );
};

export default SellProduct;
