const Joi = require('joi-oid');

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

const newUserValidation = (data) => {
	const schema = Joi.object({
		role: Joi.objectId().required(),
		firstname: Joi.string().min(2).max(255).required(),
		lastname: Joi.string().min(2).max(255).required(),
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.newUserValidation = newUserValidation;
