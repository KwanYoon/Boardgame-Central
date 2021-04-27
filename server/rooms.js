// these functions keep track of the rooms present

const rooms = [];

const addUser = (room) => {
    const roomName = room;
    const existingRoom = rooms.find((room) => room.name === roomName);
    
    if (existingRoom) {
        if (existingRoom.player1 && existingRoom.player2) {
            return { error: 'Room is full' };
        } else {
            existingRoom.player2 = 'O';
            const newRoom = existingRoom;
            return { newRoom };
        }
    }

    const newRoom = { name: roomName, player1: 'X', player2: null };
    rooms.push(newRoom);

    return { newRoom };
}

const removeRoom = (room) => {
    if (!room) {
        return { error: 'Room does not exist' };
    }

    const roomName = room.name;
    const index = rooms.findIndex((room) => room.name === roomName);

    if (index !== -1) {
        return rooms.splice(index, 1);
    }
}

const getRoom = (room) => {
    const roomName = room;
    return rooms.find((room) => room.name === roomName);
}

module.exports = { addUser, removeRoom, getRoom };