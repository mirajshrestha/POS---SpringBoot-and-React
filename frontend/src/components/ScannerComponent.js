import React from 'react'
import { useState } from 'react';

const ScannerComponent = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <label htmlFor="barcodeInput">UPC, EAN, GTIN, or ISBN number:</label>
            <input
                type="text"
                id="barcodeInput"
                name="barcodeInput"
                value={inputValue}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter barcode or ISBN"
            />
        </div>
    )
}

export default ScannerComponent