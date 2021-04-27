const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { addUser, removeRoom, getRoom } = require('./rooms');

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});

app.use(router);

io.on('connection', (socket) => {
    // on join (TikTacToe.js)
    socket.on('join', ({ room }, callback) => {
        const { error, newRoom } = addUser(room);

        if (error) {
            return callback(error);
        }
        
        socket.join(newRoom);
        if (newRoom.player2) {
            socket.emit('omove');
        } else {
            socket.emit('xmove');
        }
    });

    // on move
    socket.on('move', ({ newSquare, newTurn, room }) => {
        const roomName = getRoom(room);
        io.to(roomName).emit('moving', { newSquare, newTurn });
    });

    // when the user disconnects
    socket.on('dc', ({ room }) => {
        const roomName = getRoom(room);
        removeRoom(roomName);
        console.log('User has left');
    });
});
