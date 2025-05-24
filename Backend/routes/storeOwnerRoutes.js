const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const storeOwnerController = require('../controllers/storeOwnerController');

// Restrict to store owners only
router.use(verifyToken, checkRole(['store_owner']));

router.get('/dashboard', storeOwnerController.getStoreOwnerDashboard);
router.put('/update-password', storeOwnerController.updatePassword);

module.exports = router;
