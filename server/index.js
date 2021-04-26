const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});

app.use(router);

io.on('connection', (socket) => {
    // when a user connects
    console.log('We have a new connection');

    // on join (TikTacToe.js)
    socket.on('join', ({ room }, callback) => {
        socket.join(room);
        callback();
    });

    // on move
    socket.on('move', ({ newSquare, newTurn, room }) => {
        io.to(room).emit('moving', { newSquare, newTurn });
    });

    // when the user disconnects
    socket.on('dc', () => {
        console.log('User has left');
    });
});
