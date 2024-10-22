const ProductCard = ({ product, deleteProduct }) => (
    <div className="product-card" key={product._id}>
        <img src={product.imageUrl} alt={product.name} /> {/* Add image URL */}
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <button onClick={() => deleteProduct(product._id)}>Delete</button>
    </div>
);

export default ProductCard;