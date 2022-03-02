const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 2,
	},
	lastName: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 2,
	},
	gender: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	profilePic: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('member', MemberSchema);
