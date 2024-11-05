import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import './App.css';

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
    
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }; // Add unique ID
    setProducts([...products, productWithId]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => (product.id === id ? { ...product, ...updatedProduct } : product)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const sellProduct = (id, quantity) => {
    const product = products.find(product => product.id === id);
    if (product) {
      if (product.quantity >= quantity) {
        const cost = product.price * quantity;
        updateProduct(id, { quantity: product.quantity - quantity });
        alert(`Sold ${quantity} of ${product.name} for M${cost}`);
      } else {
        alert(`Not enough stock available for ${product.name}. Available quantity: ${product.quantity}`);
      }
    } else {
      alert('Product not found');
    }
  };

  const registerUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
  };

  const login = (credentials) => {
    const foundUser = users.find(user => user.username === credentials.username && user.password === credentials.password);
    if (foundUser) {
      setUser(foundUser.username);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <nav>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/productManagement">Product Management</Link>
              <Link to="/userManagement">User Management</Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <Routes>
              <Route path="/dashboard" element={<Dashboard products={products} />} />
              <Route path="/productManagement" element={
                <ProductManagement 
                  products={products} 
                  addProduct={addProduct} 
                  updateProduct={updateProduct} 
                  deleteProduct={deleteProduct} 
                  sellProduct={sellProduct} 
                />
              } />
              <Route path="/userManagement" element={<UserManagement users={users} registerUser={registerUser} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginForm login={login} registerUser={registerUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
