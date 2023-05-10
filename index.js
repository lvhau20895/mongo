const express = require("express");
const connectDB = require("./connect");
const User = require("./models/users");

const app = express();
const port = 1234;
connectDB();

app.get("/", (req, res) => {
	res.send("hello world");
});

app.get("/get-user", async (req, res) => {
	const data = await User.find();
	res.json(data);
});

app.post("/create", async (req, res) => {
	await User.create({ name: "Carl" });
	res.send("ok");
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
