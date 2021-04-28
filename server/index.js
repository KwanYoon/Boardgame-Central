const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { addUser, removeRoom, getRoom } = require('./TicTacToeRooms');

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});

app.use(router);

// TicTacToe functions
io.on('connection', (socket) => {
    // on join (TikTacToe.js)
    socket.on('joinTicTacToe', ({ room }, callback) => {
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

    // on play start
    socket.on('play', (room) => {
        const roomName = getRoom(room);
        io.to(roomName).emit('playStart');
    });

    // on reset
    socket.on('reset', (room) => {
        const roomName = getRoom(room);
        io.to(roomName).emit('changeTurn');
    });

    // when the user disconnects
    socket.on('dc', ({ room }) => {
        const roomName = getRoom(room);
        io.to(roomName).emit('alertLeave');
        removeRoom(roomName);
        //console.log('User has left');
    });
});
