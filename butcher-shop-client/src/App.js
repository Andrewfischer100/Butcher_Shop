
import React, { useState, useEffect } from 'react';
import GlobalStyle from './components/GlobalStyle';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products'; // Assuming you’ll create this later
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import styled from 'styled-components';

const MainContainer = styled.main`
    padding: 20px;
    background-color: #f4f4f4; // Light background
    min-height: calc(100vh - 60px); // Adjust based on your header height
`;

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
        console.log('Fetched products:', response.data); 
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
  // Function to check user role
const isAdmin = () => {
    const role = localStorage.getItem('role');
    console.log('User role:', role); // Debug log to see what role is being retrieved
    return role === 'admin'; // Adjust the condition based on your role naming
};


    return (
        <MainContainer>
             <GlobalStyle />
        <Router>
            <Header username={username} /> {/* Pass username to Header */}
            <Routes>
                <Route path="/" element={<Home setUsername={setUsername} />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products products={products} addProduct={addProduct} handleChange={handleChange} newProduct={newProduct} deleteProduct={deleteProduct} />} />
                <Route path="/admin" element={isAdmin() ? <Admin products={products} addProduct={addProduct} handleChange={handleChange} newProduct={newProduct} deleteProduct={deleteProduct} /> : <Navigate to="/products" />} />
            </Routes>
        </Router>
        </MainContainer>
    );
}

export default App;
