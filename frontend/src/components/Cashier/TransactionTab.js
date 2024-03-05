import axios from 'axios';
import { Button, Table, Collapse, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import jsPdf from 'jspdf';
import 'jspdf-autotable';

const TransactionTab = () => {
    // const [open, setOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [iconClass, setIconClass] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transaction/me');
                setTransactions(groupTransactionsByDateTime(response.data));
                setIconClass(response.data.map(() => 'bi bi-caret-right'));
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const groupTransactionsByDateTime = (transactions) => {
        const groupedTransactions = [];
        transactions.forEach((transaction) => {
            const existingGroup = groupedTransactions.find(
                (group) => group.checkoutDateTime === transaction.checkoutDateTime
            );
            if (existingGroup) {
                existingGroup.transactions.push(transaction);
            } else {
                groupedTransactions.push({
                    checkoutDateTime: transaction.checkoutDateTime,
                    transactions: [transaction],
                });
            }
        });
        return groupedTransactions;
    };

    const handleCardToggle = (index) => {
        const newIconClasses = [...iconClass];
        newIconClasses[index] = newIconClasses[index] === 'bi bi-caret-right' ? 'bi bi-caret-down' : 'bi bi-caret-right';
        setIconClass(newIconClasses);
        setSelectedGroup(index);
    }

    const handlePrintBill = () => {
        const pdfDoc = new jsPdf();
        pdfDoc.text('Transaction History', 20, 20);
        const { transactions, total } = getTransactionData(selectedGroup);

        pdfDoc.autoTable({
            head: [['#', 'Product Name', 'Price', 'Quantity', 'Total Price']],
            body: transactions,
            foot: [['', '', '', 'Total:', total]],
        })
        pdfDoc.save(`transaction_history.pdf`);
    }

    const getTransactionData = (groupIndex) => {
        const group = transactions[groupIndex];
        const transactionData = [];
        let total = 0;

            group.transactions.forEach((transaction, index) => {
                const rowData = [
                    index + 1,
                    transaction.product.name,
                    `Rs. ${transaction.product.price}`,
                    transaction.quantity,
                    `Rs. ${transaction.totalPrice}`,
                ];
                transactionData.push(rowData);
                total += transaction.totalPrice;
            });

            transactionData.push(['', '', '', 'Total:', `Rs. ${total}`]);

        return { transactions: transactionData, total: `Rs. ${total}` };
    }

    const handlePrintRef = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="mt-4">
            <h3>Transaction History</h3>
            <hr />
            {transactions.map((group, index) => (
                <div key={index}>
                    <Card>
                        <Card.Header style={{ cursor: 'pointer' }}>
                            <div className='d-flex justify-content-between align-items-center' onClick={() => { handleCardToggle(index) }}>
                                <span>Transaction {group.checkoutDateTime}</span>
                                <i className={iconClass[index]} onClick={() => { handleCardToggle(index) }}></i>
                            </div>
                        </Card.Header>

                        <Collapse in={iconClass[index] === 'bi bi-caret-down'}>

                            <Card.Body ref={componentRef}>
                                <Table striped >
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
                                        {group.transactions.map((transaction, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{transaction.product.name}</td>
                                                <td>Rs. {transaction.product.price}</td>
                                                <td>{transaction.quantity}</td>
                                                <td>Rs. {transaction.totalPrice}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className='text-right'><strong>Total:</strong></td>
                                            <td><strong>Rs. {group.transactions.reduce((sum, transaction) => sum + transaction.totalPrice, 0)}</strong></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={handlePrintBill}><i class="bi bi-printer"></i> Print Bill</Button>
                            </Card.Body>

                        </Collapse>
                    </Card>
                    <br />
                </div>
            ))}

        </div >
    )
}

export default TransactionTab;