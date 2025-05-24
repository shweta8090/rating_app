import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { logout } from '../utils/auth';
import '../styles/DashboardStoreOwner.css'
import { useNavigate } from 'react-router-dom';



function DashboardStoreOwner() {
  const [storeData, setStoreData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    API.get('/store-owner/dashboard')
      .then((res) => setStoreData(res.data))
      .catch((err) => {
        console.error('Failed to fetch store owner data', err);
      });
  }, []);
   const navigate = useNavigate();

  return (
    <div className="dashboard-container">
  <div className="dashboard-header">
    <h2>Store Owner Dashboard</h2>
     <button className="logout-btn" onClick={() => navigate('/update-password')}>
    Update 
  </button>
    <button className="logout-btn" onClick={logout}>Logout</button>
  </div>

  {storeData ? (
    <>
      <div className="store-info-card">
        <h3>Store Name: {storeData.store.store_name}</h3>
        <p className="store-rating">
          Average Rating: 
          <span className="rating-value">
            {storeData.store.average_rating || 'N/A'}
          </span>
        </p>
      </div>

      <div className="ratings-section">
        <h4>Users who rated your store:</h4>
        {storeData.rated_by_users.length === 0 ? (
          <p className="no-ratings">No ratings yet.</p>
        ) : (
          <ul className="user-ratings-list">
            {storeData.rated_by_users.map((user) => (
              <li key={user.id} className="user-rating-item">
                <span className="user-name">{user.name}</span>
                <span className="user-email">({user.email})</span>
                <span className="user-rating">Rating: {user.rating}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  ) : (
    <p className="loading-message">
      <span className="loading-spinner"></span>
      Loading store data...
    </p>
  )}
</div>
  );
}

export default DashboardStoreOwner;
