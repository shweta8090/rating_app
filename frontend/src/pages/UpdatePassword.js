import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword) {
      return setError('Both fields are required');
    }

    try {
      const res = await API.put('/users/update-password', form);
      setMsg(res.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Update failed');
      setMsg('');
    }
  };

  return (
    <div>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="password"
          placeholder="Current Password"
          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={{ marginTop: '10px' }}>
        Back
      </button>
    </div>
  );
}

export default UpdatePassword;
