import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { logout } from '../utils/auth';
import '../styles/DashboardUser.css'
import { useNavigate } from 'react-router-dom';



function DashboardUser() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch stores based on optional search query
  const fetchStores = async () => {
    try {
      const res = await API.get(`/users/stores${search ? `?search=${search}` : ''}`);
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Rate a store (POST or PUT based on existence)
  const rateStore = async (store_id, rating) => {
    try {
      await API.post('/users/rate', { store_id, rating });
      fetchStores();
    } catch (err) {
      await API.put(`/users/rate/${store_id}`, { rating });
      fetchStores();
    }
  };
  const navigate = useNavigate();


  useEffect(() => {
    fetchStores();
  }, [search]);

  return (
    <div className="dashboard-container">
  <h2>User Dashboard</h2>
  <div className="dashboard-header">
    <input
      className="search-input"
      placeholder="Search stores..."
      onChange={(e) => setSearch(e.target.value)}
    />
    <button className="logout-btn" onClick={() => navigate('/update-password')}>
    Update 
  </button>
    <button className="logout-btn" onClick={logout}>Logout</button>
  </div>
  
  <div className="stores-grid">
    {stores.map((store) => (
      <div key={store.id} className="store-card">
        <h4>{store.name}</h4>
        <div className="store-info">
          <p><strong>Address:</strong> {store.address}</p>
          <p><strong>Avg Rating:</strong> {store.average_rating || 'N/A'}</p>
          <p><strong>Your Rating:</strong> {store.user_rating || 'Not rated'}</p>
        </div>
        <div className="rating-section">
          <span className="rating-display">Rate this store:</span>
          <select 
            className="rating-select"
            onChange={(e) => rateStore(store.id, parseInt(e.target.value))}
          >
            <option>Rate</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default DashboardUser;
