// these functions keep track of the TicTacToe rooms present

const rooms = [];

const addUserTicTacToe = (room) => {
    const roomName = room;
    const existingRoom = rooms.find((room) => room.name === roomName);
    
    // if there is existing room
    if (existingRoom) {
        if (existingRoom.player1 && existingRoom.player2) {
            // if there is player1 and player2
            return { error: 'Room is full' };
        } else {
            // if there is only player 1
            existingRoom.player2 = 'O';
            const newRoom = existingRoom;
            return { newRoom };
        }
    }

    // if room does not exist
    const newRoom = { name: roomName, player1: 'X', player2: null };
    rooms.push(newRoom);

    return { newRoom };
}

const removeRoomTicTacToe = (room) => {
    // if room does not exist
    if (!room) {
        return { error: 'Room does not exist' };
    }

    // finding room
    const roomName = room.name;
    const index = rooms.findIndex((room) => room.name === roomName);

    // removing room
    if (index !== -1) {
        return rooms.splice(index, 1);
    }
    // if room does not exist
    return { error: 'Room does not exist' };
}

const getRoomTicTacToe = (room) => {
    const roomName = room;
    return rooms.find((room) => room.name === roomName);
}

module.exports = { addUserTicTacToe, removeRoomTicTacToe, getRoomTicTacToe };