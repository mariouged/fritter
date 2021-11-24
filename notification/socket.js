const server = require('./server');
const cors = require('cors');
const io = require('socket.io')(server, { cors: {
    origin: "*"
  }});

module.exports = {
	socket : any = io.on('connection', (socket) => {
		console.log('Client Socket Connected', socket.id);
		socket.on("disconnect", () => console.log(`${socket.id} Client disconnected.`));
	})
};