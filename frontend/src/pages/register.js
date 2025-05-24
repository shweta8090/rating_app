import React, { useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import '../styles/register.css'



function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 5 || form.name.length > 60) return setError('Name must be between 20 and 60 characters');
    if (form.address.length > 400) return setError('Address too long');
    if (!/[A-Z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      return setError('Password must contain uppercase & special character');
    }

    try {
      await API.post('/auth/register', { ...form, role: 'user' });
      alert('Registration successful. You can now log in.');
      window.location.href = '/login';
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
   <form className="registration-form" onSubmit={handleSubmit}>
  <h2>Register</h2>
  {error && <p className="error-message">{error}</p>}
  <input 
    className="form-input"
    placeholder="Name" 
    onChange={(e) => setForm({ ...form, name: e.target.value })} 
  />
  <input 
    className="form-input"
    placeholder="Email" 
    type="email" 
    onChange={(e) => setForm({ ...form, email: e.target.value })} 
  />
  <input 
    className="form-input"
    placeholder="Address" 
    onChange={(e) => setForm({ ...form, address: e.target.value })} 
  />
  <input 
    className="form-input"
    placeholder="Password" 
    type="password" 
    onChange={(e) => setForm({ ...form, password: e.target.value })} 
  />
  <button className="submit-button" type="submit">Register</button>
  <p className="login-link-text">
    Already have an account? <Link className="login-link" to="/login">Login</Link>
   
  </p>
</form>
  );
}

export default Register;
