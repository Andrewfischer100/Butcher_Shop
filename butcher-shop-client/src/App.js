
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products'; // Assuming you’ll create this later
import Admin from './pages/Admin';

function App() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });
    const [username, setUsername] = useState('');

    // Fetch products
    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - ${name}: ${value}`); // Debug log
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Add a new product
    const addProduct = async (e) => {
        e.preventDefault();
        console.log("Attempting to add product:", newProduct); // Debug log

        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('No token found, user might not be authenticated.');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        };

        try {
            await axios.post('http://localhost:5000/api/products', newProduct, config);
            fetchProducts(); // Refresh the product list
            setNewProduct({ name: '', description: '', price: '', quantity: '' }); // Reset the form
            console.log('Product added successfully:', newProduct);
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
        }
    };

    //Delete a product
    const deleteProduct = async(productId) => {
        const token = localStorage.getItem('token');

        if (!token) { 
            console.error('No token found, user might not be authenticated.'); 
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        };

        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`, config);
            fetchProducts(); // Refresh the product list
            console.log('Product deleted successfully:', productId);
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
        }
    };
    

    // Function to check user role
    const isAdmin = () => {
        const role = localStorage.getItem('role');
        return role === 'admin'; // Adjust the condition based on your role naming
    };

    return (
        <Router>
            <Header username={username} /> {/* Pass username to Header */}
            <Routes>
                <Route path="/" element={<Home setUsername={setUsername} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products products={products} addProduct={addProduct} handleChange={handleChange} newProduct={newProduct} deleteProduct={deleteProduct} />} />
                <Route path="/admin" element={isAdmin() ? <Admin products={products} addProduct={addProduct} handleChange={handleChange} newProduct={newProduct} deleteProduct={deleteProduct} /> : <Navigate to="/products" />} />
            </Routes>
        </Router>
    );
}

export default App;
