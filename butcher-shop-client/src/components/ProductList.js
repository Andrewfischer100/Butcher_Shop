import React from 'react';

const ProductList = ({ products }) => {
    return (
        <ul>
            {products.map(product => (
                <li key={product._id}>
                    {product.name} - ${product.price} - Quantity: {product.quantity}
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
