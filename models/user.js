var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSChema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: String,
	firstName: String,
	lastName: String,
	email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
	isAdmin: {type: Boolean, default: false}
});

UserSChema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSChema);

