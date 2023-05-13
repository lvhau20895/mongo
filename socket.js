const { Server } = require("socket.io");

const socketServer = http => {
	const io = new Server(http, {
		cors: { origin: "*" }
	});

	io.on("connection", socket => {
		io.emit("fe-connect", socket.id);

		socket.on("client to server", data => {
			io.emit("server to client", data);
		});

		socket.on("disconnect", reason => {
			io.emit("fe-dis", socket.id);
		});
	});
};

module.exports = socketServer;
