const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: { type: String },
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("User", UserSchema);
