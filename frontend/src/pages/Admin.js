import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import AddProduct from '../components/AddProduct'; // Importing AddProduct


const Admin = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Admin - Manage Products</h2>
            <AddProduct fetchProducts={fetchProducts} /> {/* Using AddProduct */}
            <ProductList products={products} />
        </div>
    );
};

export default Admin;
