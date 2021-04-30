// these functions keep track of the Connect4 rooms that are present

const rooms = [];

const addUserConnect4 = (room) => {
    const roomName = room;
    const existingRoom = rooms.find((curr) => curr.name === roomName);

    // if there is existing room
    if (existingRoom) {
        if (existingRoom.player1 && existingRoom.player2) {
            // if there is player1 and player2
            return { error: 'Room is full' };
        } else {
            // if there is only player 1
            existingRoom.player2 = 'yellow';
            const newRoom = existingRoom;
            return { newRoom };
        }
    }

    // if room does not exist
    const newRoom = { name: roomName, player1: 'red', player2: null };
    rooms.push(newRoom);

    return { newRoom };
}

const removeRoomConnect4 = (room) => {
    // if room does not exist
    if (!room) {
        return { error: 'Room does not exist' };
    }

    // finding room
    const roomName = room.name;
    const index = rooms.findIndex((curr) => curr.name === roomName);

    // removing room
    if (index !== -1) {
        return rooms.splice(index, 1);
    }
    // if room does not exist
    return { error: 'Room does not exist' };
}

const getRoomConnect4 = (room) => {
    const roomName = room;
    return rooms.find((curr) => curr.name === roomName);
}

module.exports = { addUserConnect4, removeRoomConnect4, getRoomConnect4 };