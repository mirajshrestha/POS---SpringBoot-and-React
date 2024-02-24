import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const CartTab = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/cart/all');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const totalPrice = cartItems.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
    }, 0);

    const handleDeleteItem = async (cartItemId, productId, quantity) => {
        try {
            await axios.delete(`/api/cart/remove/${cartItemId}`);


            fetchCartItems();
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            await axios.post('/api/cart/checkout');
            alert('succesful in transaction');
            fetchCartItems();
        } catch (error) {
            console.error("error checking out", error);
        }
    }

    return (
        <div className="mt-4">
            <h3>Cart Items</h3>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((cartItem, index) => (
                        <tr key={index}>
                            <td><Button variant="danger" onClick={() => handleDeleteItem(cartItem.id, cartItem.product.id, cartItem.quantity)}><i className="bi bi-trash3"></i></Button></td>
                            <td>{cartItem.product.name}</td>
                            <td>${cartItem.product.price}</td>
                            <td>{cartItem.quantity}</td>
                            <td>${cartItem.product.price * cartItem.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="mt-3">
                <strong>Total: ${totalPrice}</strong>
            </div>
            <div className="mt-3">
                <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
            </div>
        </div>
    )
}

export default CartTab;