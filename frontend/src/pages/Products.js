import React from 'react';
import ProductCard from '../components/ProductCard'; // Import the ProductCard component
import SearchBar from '../components/SearchBar'; // Import SearchBar
import SortOptions from '../components/SortOptions'; // Import SortOptions

const Products = ({ 
    products = [], // Provide a default value to avoid undefined
    addProduct, 
    handleChange, 
    newProduct, 
    deleteProduct, 
    searchTerm = '', // Provide a default value to avoid undefined
    setSearchTerm, 
    sortOption, 
    setSortOption 
}) => {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOption === 'price') {
            return a.price - b.price; // Ascending order by price
        } else if (sortOption === 'name') {
            return a.name.localeCompare(b.name); // Alphabetical order by name
        }
        return 0; // No sorting
    });

    return (
        <div>
            <h1>Products</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />

            {sortedProducts.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div className="product-grid">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} deleteProduct={deleteProduct} />
                    ))}
                </div>
            )}
            <h2>Add New Product</h2>
            <form onSubmit={addProduct}>
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Product Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
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
