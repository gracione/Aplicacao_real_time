const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('chat message', data => {
        console.log('Chat message:', data);
//        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

SERVER_HOST = 'localhost';
SERVER_PORT = 8081

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log('[HTTP] Listen ->');
});
