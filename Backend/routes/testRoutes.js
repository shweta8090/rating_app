const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Accessible to any logged-in user
router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: `Hello, user with ID ${req.user.id} and role ${req.user.role}` });
});

// Admin-only route
router.get('/admin-only', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ msg: `Welcome, admin ${req.user.id}` });
});

// Normal user-only route
router.get('/user-only', verifyToken, checkRole(['user']), (req, res) => {
  res.json({ msg: `Welcome, normal user ${req.user.id}` });
});

// Store owner-only route
router.get('/store-owner-only', verifyToken, checkRole(['store_owner']), (req, res) => {
  res.json({ msg: `Welcome, store owner ${req.user.id}` });
});

module.exports = router;
