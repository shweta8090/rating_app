const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const userController = require('../controllers/userControllers');

// Only normal users
router.use(verifyToken, checkRole(['user']));

router.get('/stores', userController.getAllStores);
router.post('/rate', userController.submitRating);
router.put('/rate/:storeId', userController.updateRating);
router.put('/update-password', verifyToken, userController.updatePassword);

module.exports = router;
