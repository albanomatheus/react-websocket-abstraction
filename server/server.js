const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_PORT = process.env.PORT || 8080;

io.on("connect", socket => {
	console.log("[IO] Connection => Server has a new connection");

	socket.on("chat.message", data => {
		console.log("[SOCKET] chat.message => ", data);
		io.emit("chat.message", data);
	});

	socket.on("chat2.message", data => {
		console.log("[SOCKET] chat2.message => ", data);
		io.emit("chat2.message", data);
	});

	socket.on("disconnect", () => {
		console.log("[IO] Disconnect => A connection was disconnected");
	});
});

server.listen(SERVER_PORT, () => {
	console.log(`[HTTP] Listen => Server is running at http://:${SERVER_PORT}`);
});
