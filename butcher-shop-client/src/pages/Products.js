import React from 'react';
import deleteProduct from '../App'

const Products = ({ products, addProduct, handleChange, newProduct }) => {
    return (
        <div>
            <h1>Products</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}> {/* Assuming product has an id field */}
                            <h2>{product.name}</h2>
                            {product.name} - {product.price} - {product.description}
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                             {/* Add a delete button */}
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <h2>Add New Product</h2>
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
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={handleChange}
                    required
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
        </div>
    );
};

export default Products;
