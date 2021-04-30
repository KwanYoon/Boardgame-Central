const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { addUserTicTacToe, removeRoomTicTacToe, getRoomTicTacToe } = require('./TicTacToeRooms');
const { addUserConnect4, removeRoomConnect4, getRoomConnect4 } = require('./Connect4Rooms');

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});

app.use(router);

// TicTacToe functions
io.on('connection', (socket) => {
    // TicTacToe functions
    // on joining TicTacToe
    socket.on('joinTicTacToe', ({ room }, callback) => {
        const { error, newRoom } = addUserTicTacToe(room);

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

    // on moving TicTacToe
    socket.on('moveTicTacToe', ({ newSquare, newTurn, room }) => {
        const roomName = getRoomTicTacToe(room);
        io.to(roomName).emit('moving', { newSquare, newTurn });
    });

    // on play start TicTacToe
    socket.on('playTicTacToe', (room) => {
        const roomName = getRoomTicTacToe(room);
        io.to(roomName).emit('playStart');
    });

    // on reset TicTacToe
    socket.on('resetTicTacToe', (room) => {
        const roomName = getRoomTicTacToe(room);
        io.to(roomName).emit('changeTurn');
    });

    // when the user disconnects TicTacToe
    socket.on('dcTicTacToe', ({ room }) => {
        const roomName = getRoomTicTacToe(room);
        io.to(roomName).emit('alertLeave');
        removeRoomTicTacToe(roomName);
    });


    // Connect4 functions
    // on joining
    socket.on('joinConnect4', ({ room }, callback) => {
        const { error, newRoom } = addUserConnect4(room);

        if (error) {
            return callback(error);
        }
        
        socket.join(newRoom);

        if (newRoom.player2) {
            socket.emit('yellowmove');
        } else {
            socket.emit('redmove');
        }
    });

    // on moving
    socket.on('moveConnect4', ({ newColumn, newColor, room }, callback) => {
        const roomName = getRoomConnect4(room);
        io.to(roomName).emit('movingConnect4', { newColumn, newColor });
    });

    // on play start
    socket.on('playConnect4', (room) => {
        const roomName = getRoomConnect4(room);
        io.to(roomName).emit('playStartConnect4');
    });

    // on reset
    socket.on('resetConnect4', (room) => {
        const roomName = getRoomConnect4(room);
        io.to(roomName).emit('changeColorConnect4');
    });

    // when user disconnects
    socket.on('dcConnect4', ({ room }) => {
        const roomName = getRoomConnect4(room);
        io.to(roomName).emit('alertLeaveConnect4');
        removeRoomConnect4(roomName);
    });
});
