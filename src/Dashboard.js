import React from 'react';

function Dashboard({ products }) {
  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}: {product.quantity} in stock
            {product.quantity < 5 && <span style={{ color: 'red' }}> (Low Stock)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
