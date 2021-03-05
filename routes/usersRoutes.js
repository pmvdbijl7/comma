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

// Edit User
router.get('/settings/user/:id/edit', verifyAuth, usersController.userEditGet);
router.put(
	'/settings/user/:id/edit',
	verifyAuth,
	usersController.userEditUpdate
);

// Delete User
router.get('/settings/user/:id/delete', verifyAuth, usersController.deleteUser);

module.exports = router;
