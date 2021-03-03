const Joi = require('joi');

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).max(1024).required(),
	});

	return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
