const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidation } = require('./validationController');
require('dotenv/config');

// Login Controllers
const loginGet = (req, res) => {
	res.render('pages/auth/login', { title: 'Sign In' });
};

const loginPost = async (req, res) => {
	// Validate Login Data
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if Email Address is Correct
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Your email address is wrong');

	// Check if Password is Correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Your password is wrong');

	// Create accessToken and Assign to Cookie
	const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.cookie('accessToken', accessToken);
	res.redirect('/');
};

const logout = (req, res) => {
	if (req.cookies.accessToken) {
		res.clearCookie('accessToken');
		res.redirect('/signin');
	}
};

module.exports = {
	loginGet,
	loginPost,
	logout,
};
