const SortOptions = ({ sortOption, setSortOption }) => (
    <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="quantity">Quantity</option>
    </select>
);

export default SortOptions;