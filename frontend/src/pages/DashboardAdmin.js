// src/pages/DashboardAdmin.js
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { logout } from '../utils/auth';
import '../styles/DashboardAdmin.css'

function DashboardAdmin() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchStore, setSearchStore] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', owner_id: '' });

  useEffect(() => {
    API.get('/admin/dashboard').then((res) => setStats(res.data));
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await API.get('/admin/stores');
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStores();
  }, []);

  const handleAddUser = async () => {
    try {
      await API.post('/admin/add-user', newUser);
      fetchUsers();
      alert('User added');
    } catch (err) {
      alert('Failed to add user');
    }
  };

  const handleAddStore = async () => {
    try {
      await API.post('/admin/add-store', newStore);
      fetchStores();
      alert('Store added');
    } catch (err) {
      alert('Failed to add store');
    }
  };

  
    return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
      
      <div className="stats-section">
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Stores: {stats.totalStores}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>

      <div className="form-section">
        <h3>Add New User</h3>
        <div className="form-row">
          <input 
            placeholder="Name" 
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
          />
          <input 
            placeholder="Email" 
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
          />
          <input 
            placeholder="Password" 
            type="password"
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
          />
        </div>
        <div className="form-row">
          <input 
            placeholder="Address" 
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} 
          />
          <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      </div>

      <div className="form-section">
        <h3>Add New Store</h3>
        <div className="form-row">
          <input 
            placeholder="Store Name" 
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} 
          />
          <input 
            placeholder="Store Email" 
            onChange={(e) => setNewStore({ ...newStore, email: e.target.value })} 
          />
          <input 
            placeholder="Store Address" 
            onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} 
          />
        </div>
        <div className="form-row">
          <input 
            placeholder="Owner ID" 
            onChange={(e) => setNewStore({ ...newStore, owner_id: e.target.value })} 
          />
          <button onClick={handleAddStore}>Add Store</button>
        </div>
      </div>

      <div className="search-section">
        <h3>Filter Users</h3>
        <input 
          className="search-input"
          placeholder="Search users by name, email, address, or role" 
          onChange={(e) => setSearchUser(e.target.value.toLowerCase())} 
        />
        <div className="results-container">
          {users
            .filter(u =>
              (u.name || '').toLowerCase().includes(searchUser) ||
              (u.email || '').toLowerCase().includes(searchUser) ||
              (u.address || '').toLowerCase().includes(searchUser) ||
              (u.role || '').toLowerCase().includes(searchUser)
            )
            .map(user => (
              <div key={user.id} className="user-item">
                <div className="item-details">
                  <span><span className="detail-label">Name:</span> <span className="detail-value">{user.name}</span></span>
                  <span><span className="detail-label">Email:</span> <span className="detail-value">{user.email}</span></span>
                  <span><span className="detail-label">Address:</span> <span className="detail-value">{user.address || '-'}</span></span>
                  <span><span className="detail-label">Role:</span> <span className="detail-value">{user.role}</span></span>
                  {user.role === 'store_owner' && user.store_rating !== undefined && (
                    <span className="rating">
                      Avg Rating: {user.store_rating ?? 'N/A'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          {users.filter(u =>
            (u.name || '').toLowerCase().includes(searchUser) ||
            (u.email || '').toLowerCase().includes(searchUser) ||
            (u.address || '').toLowerCase().includes(searchUser) ||
            (u.role || '').toLowerCase().includes(searchUser)
          ).length === 0 && (
            <div className="empty-state">
              No users found matching your search criteria.
            </div>
          )}
        </div>
      </div>

      <div className="search-section">
        <h3>Filter Stores</h3>
        <input 
          className="search-input"
          placeholder="Search stores by name, email, or address" 
          onChange={(e) => setSearchStore(e.target.value.toLowerCase())} 
        />
        <div className="results-container">
          {stores
            .filter(s =>
              (s.name || '').toLowerCase().includes(searchStore) ||
              (s.email || '').toLowerCase().includes(searchStore) ||
              (s.address || '').toLowerCase().includes(searchStore)
            )
            .map(store => (
              <div key={store.id} className="store-item">
                <div className="item-details">
                  <span><span className="detail-label">Name:</span> <span className="detail-value">{store.name}</span></span>
                  <span><span className="detail-label">Email:</span> <span className="detail-value">{store.email}</span></span>
                  <span><span className="detail-label">Address:</span> <span className="detail-value">{store.address || '-'}</span></span>
                  <span className="rating">
                    Avg Rating: {store.average_rating ?? 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          {stores.filter(s =>
            (s.name || '').toLowerCase().includes(searchStore) ||
            (s.email || '').toLowerCase().includes(searchStore) ||
            (s.address || '').toLowerCase().includes(searchStore)
          ).length === 0 && (
            <div className="empty-state">
              No stores found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
