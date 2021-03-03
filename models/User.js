const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
	{
		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
		},
		firstname: {
			type: String,
			minLength: 2,
			maxLength: 255,
		},
		lastname: {
			type: String,
			minLength: 2,
			maxLength: 255,
		},
		email: {
			type: String,
			maxLength: 255,
			required: true,
			unique: true,
			uniqueCaseInsensitive: true,
		},
		password: {
			type: String,
			minLength: 8,
			maxLength: 1024,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
