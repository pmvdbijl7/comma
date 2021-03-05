const router = require('express').Router();
const usersController = require('../controllers/usersController');
const verifyAuth = require('../controllers/verifyAuthController');

// All Users
router.get('/settings/users', verifyAuth, usersController.usersGet);

// Create User
router.get('/settings/user/create', verifyAuth, usersController.userCreateGet);
router.post(
	'/settings/user/create',
	verifyAuth,
	usersController.userCreatePost
);

module.exports = router;
