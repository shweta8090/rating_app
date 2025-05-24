import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import DashboardStoreOwner from './pages/DashboardStoreOwner';
import UpdatePassword from './pages/UpdatePassword'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/user" element={<DashboardUser />} />
        <Route path="/store-owner" element={<DashboardStoreOwner />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;