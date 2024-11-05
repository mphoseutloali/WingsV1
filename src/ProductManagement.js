import React, { useState } from 'react';

function ProductManagement({ products, addProduct, deleteProduct, sellProduct }) {
  const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '' });
  const [sellQuantity, setSellQuantity] = useState({});
  const [transactions, setTransactions] = useState([]);

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ name: '', description: '', category: '', price: '', quantity: '' }); // Reset form
  };

  const handleSell = (id) => {
    const quantity = sellQuantity[id];
    if (quantity > 0) {
      const productToSell = products.find((p) => p.id === id);
      if (productToSell) {
        sellProduct(id, quantity);
        // Record the transaction
        setTransactions([...transactions, {
          product: productToSell.name,
          quantity: quantity,
          total: (productToSell.price * quantity).toFixed(2),
          date: new Date().toLocaleString(),
        }]);
        setSellQuantity({ ...sellQuantity, [id]: '' }); // Reset quantity after selling
      }
    } else {
      alert('Please enter a valid quantity');
    }
  };


  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleAddProductSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Initial Quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>M{product.price}</td>
              <td>
                <input
                  type="number"
                  value={sellQuantity[product.id] || ''}
                  onChange={(e) => setSellQuantity({ ...sellQuantity, [product.id]: e.target.value })}
                  p laceholder="Quantity to sell"
                />
                <button
                  onClick={() => handleSell(product.id)}
                  disabled={!sellQuantity[product.id] || sellQuantity[product.id] > product.quantity}
                >
                  Sell
                </button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total (M)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.product}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.total}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;