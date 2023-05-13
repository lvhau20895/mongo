const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
	age: { type: Number, require: true }
});

module.exports = mongoose.model("Profile", ProfileSchema);
