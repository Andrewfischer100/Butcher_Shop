import React, { useState } from 'react';
import Products from './Products';

const Parent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]); // State for products
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '' });

    const addProduct = (event) => {
        event.preventDefault(); // Prevent the default form submission
        setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: Date.now() }]); // Add the new product with an id
        setNewProduct({ name: '', description: '', price: '', quantity: '' }); // Reset newProduct
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value })); // Update the newProduct state
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId)); // Remove the product
    };

    return (
        <Products
            products={products}
            addProduct={addProduct}
            handleChange={handleChange}
            newProduct={newProduct} // Pass the new product state
            deleteProduct={deleteProduct}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm} // Pass the function here
            sortOption={null} // Pass your sort option if applicable
            setSortOption={null} // Pass your setSortOption function if you have it
        />
    );
};

export default Parent;
