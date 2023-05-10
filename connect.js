const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://demo:20081995@website.rttx94h.mongodb.net/demo?retryWrites=true&w=majority"
		);
		console.log("connect database success");
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;
