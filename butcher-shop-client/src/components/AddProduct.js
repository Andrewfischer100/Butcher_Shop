import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ fetchProducts }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', newProduct);
            fetchProducts();  // Call to update the product list after adding a new product
            setNewProduct({ name: '', description: '', price: '', quantity: '' }); // Clear input fields
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={addProduct}>
            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleChange} required />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
