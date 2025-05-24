import React, { useState } from 'react';
import API from '../api/api';
import '../styles/login.css'
function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return setError('Please enter all fields');
    }
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      const role = res.data.user.role;
      window.location.href = role === 'admin' ? '/admin' : role === 'user' ? '/user' : '/store-owner';
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
  <h2>Login</h2>
  {error && <p className="error-message">{error}</p>}
  <input 
    className="form-input"
    placeholder="Email" 
    type="email" 
    onChange={(e) => setForm({ ...form, email: e.target.value })} 
  />
  <input 
    className="form-input"
    placeholder="Password" 
    type="password" 
    onChange={(e) => setForm({ ...form, password: e.target.value })} 
  />
  <button className="submit-button" type="submit">Login</button>
</form>
  );
}

export default Login;