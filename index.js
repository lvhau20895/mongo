const express = require("express");
const connectDB = require("./connect");
const User = require("./models/users");
const Profile = require("./models/profiles");
const { createServer } = require("http");
const socketServer = require("./socket");

const app = express();
app.use(express.json());
const port = 1234;
connectDB();

app.get("/", (req, res) => {
	res.send("hello world");
});

// user
app.get("/get-user", async (req, res) => {
	const data = await User.find();
	res.json(data);
});

// app.get("/get-user-details", async (req, res) => {
// 	const data = await User.aggregate([
// 		{
// 			$lookup: {
// 				from: "profiles",
// 				localField: "profile",
// 				foreignField: "_id",
// 				as: "profile"
// 			}
// 		},
// 		{
// 			$project: {
// 				_id: 1,
// 				name: 1,
// 				age: { $arrayElemAt: ["$profile.age", 0] },
// 				createdAt: 1,
// 				updatedAt: 1
// 			}
// 		}
// 	]);
// 	res.json(data);
// });

app.get("/get-user-details", async (req, res) => {
	const data = await User.find().populate({
		path: "profile",
		select: "age -_id"
	});
	const newData = data.map(user => {
		return {
			_id: user._id,
			name: user.name,
			age: user.profile?.age
		};
	});
	res.json(newData);
});

app.post("/create", async (req, res) => {
	const { name } = req.body;
	await User.create({ name });
	res.send("ok");
});

// profile
app.post("/create-profile", async (req, res) => {
	const { userId, age } = req.body;
	const user = await User.findById(userId);
	if (!user) return res.send("Not user");
	const profile = await Profile.create({ age });
	// user.profile = profile._id;
	// await user.save();
	await User.updateOne({ _id: userId }, { $set: { profile: profile._id } });
	res.send(user);
});

const http = createServer(app);
socketServer(http);

http.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
