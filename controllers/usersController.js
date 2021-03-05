const bcrypt = require('bcrypt');
const User = require('../models/User');
const Role = require('../models/Role');
const { newUserValidation } = require('./validationController');

// Get All Users
const usersGet = (req, res) => {
	// Get Logged in User ID
	const authUserId = req.user._id;

	// Check if User has Permission
	User.findById(authUserId)
		.populate('role')
		.then((authUser) => {
			if (authUser.role.name == 'Administrator') {
				// Load Page
				User.find()
					.populate('role')
					.then((users) => {
						res.render('pages/users/view', {
							title: 'Users',
							users: users,
						});
					});
			} else {
				res.status(403).end();
			}
		});
};

// Get Create New User Page
const userCreateGet = (req, res) => {
	// Get Logged in User ID
	const authUserId = req.user._id;

	// Check if User has Permission
	User.findById(authUserId)
		.populate('role')
		.then((authUser) => {
			if (authUser.role.name == 'Administrator') {
				// Load Page
				Role.find().then((roles) => {
					res.render('pages/users/create', {
						title: 'Create New User',
						roles: roles,
					});
				});
			} else {
				res.status(403).end();
			}
		});
};

// Create New User
const userCreatePost = async (req, res) => {
	// Validate Data
	const { error } = newUserValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create New User
	const user = new User({
		role: req.body.role,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hashedPassword,
	});

	user.save()
		.then((result) => {
			res.redirect('/settings/users');
		})
		.catch((err) => {
			res.send(err.message);
		});
};

module.exports = {
	usersGet,
	userCreateGet,
	userCreatePost,
};
