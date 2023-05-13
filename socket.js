const { Server } = require("socket.io");

const socketServer = http => {
	const io = new Server(http, {
		cors: { origin: "*" }
	});

	let number = 0;
	io.on("connection", socket => {
		// socket.emit: chỉ gửi cho 1 client kết nối đến server
		// io.emit: gửi cho tất cả client đang kết nối đến server
		io.emit("fe-connect", socket.id);

		socket.on("client to server", data => {
			number++;
			io.emit("server to client", number);
		});

		// lắng nghe 1 client thoát server
		socket.on("disconnect", reason => {
			io.emit("fe-dis", socket.id);
		});
	});
};

module.exports = socketServer;
