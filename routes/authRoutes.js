const router = require('express').Router();
const authController = require('../controllers/authController');

// Login
router.get('/signin', authController.loginGet);
router.post('/signin', authController.loginPost);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
