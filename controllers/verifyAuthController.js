const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
	// Get accessToken
	const accessToken = req.cookies.accessToken;

	// If There is no accessToken -> Redirect to Login Page
	if (!accessToken) return res.redirect('/signin');

	try {
		const verified = jwt.verify(accessToken, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid token');
	}
};
