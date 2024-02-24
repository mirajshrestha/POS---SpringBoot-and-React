import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ProductTab = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product/all');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            const response = await axios.post('/api/cart/add', {
                productId: productId,
                quantity: 1,
            });

            alert(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="mt-4">
            <h3>Products</h3>
            <hr />
            <Table striped bordered hover>
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
                                <Button disabled={product.quantity === 0} onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    )
}

export default ProductTab;