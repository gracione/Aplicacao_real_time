const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8081;

io.on('connection', socket => {
    console.log('New connection');
    socket.on('chat.message', data => {
        console.log('message => ', data);
        nomeUsuario = data.name;
        if (!data.name) {
            nomeUsuario = 'Anônimo';
        }

        io.emit('chat.message', { name: nomeUsuario, message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('Disconnect => A connection was disconnected');
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
