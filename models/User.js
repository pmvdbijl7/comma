const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
	{
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
			required: true,
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
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
