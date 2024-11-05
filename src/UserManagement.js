import React, { useEffect, useState } from 'react';

function UserManagement({ users, addUser, updateUser, deleteUser }) {
  const [userForm, setUserForm] = useState({ username: '', password: '', id: null });
  const [loggedInUsers, setLoggedInUsers] = useState(() => {
    const savedUsers = localStorage.getItem('loggedInUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
  }, [loggedInUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userForm.id) {
      updateUser(userForm.id, { username: userForm.username, password: userForm.password });
    } else {
      addUser({ username: userForm.username, password: userForm.password });
    }
    setUserForm({ username: '', password: '', id: null });
  };

  const handleEdit = (user) => {
    setUserForm({ username: user.username, password: user.password, id: user.id });
  };

  const handleLogin = (user) => {
    setLoggedInUsers([...loggedInUsers, user]);
    alert(`${user.username} has logged in!`);
  };

  const handleRemoveUser = (username) => {
    setLoggedInUsers(loggedInUsers.filter(user => user.username !== username));
    alert(`${username} has been removed!`);
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userForm.username}
          onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userForm.password}
          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          required
        />
        <button type="submit">{userForm.id ? 'Update User' : 'Add User'}</button>
      </form>

      <h3>Existing Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => handleLogin(user)}>Login</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Logged In Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loggedInUsers.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleRemoveUser(user.username)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
