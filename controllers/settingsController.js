const User = require('../models/User');

const settingsGet = (req, res) => {
	const authUserId = req.user._id;

	User.findById(authUserId)
		.populate('role')
		.then((authUser) => {
			res.render('pages/settings/view', {
				title: 'Settings',
				authUser: authUser,
			});
		});
};

module.exports = {
	settingsGet,
};
