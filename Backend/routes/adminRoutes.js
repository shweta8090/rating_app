const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.use(verifyToken, checkRole(['admin']));

router.get('/dashboard', adminController.getDashboardStats);
router.post('/add-user', adminController.addUser);
router.post('/add-store', adminController.addStore);
router.get('/stores', adminController.getAllStores);
router.get('/users', adminController.getAllUsers);

module.exports = router;
