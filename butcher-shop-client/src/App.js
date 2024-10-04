import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });

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
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Add a new product
    const addProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/products', newProduct);
        fetchProducts(); // Refresh the product list
        setNewProduct({ name: '', description: '', price: '', quantity: '' }); // Reset the form
    console.log('Adding product:', newProduct);

      };

    return (
        <div>
            <h1>Butcher Shop</h1>
            <form onSubmit={addProduct}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - {product.price} - {product.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
