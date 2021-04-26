import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './TicTacToe.css';

const TicTacToeLogin = () => {
    const [room, setRoom] = useState(null);

    const handleRoomId = (e) => {
        if (!room) {
            e.preventDefault();
        }
    };

    return (
        <div>
            <input placeholder="Room ID" type="text" onChange={(e) => setRoom(e.target.value)} />
            <Link onClick={(e) => handleRoomId(e)} to={`/tictactoe?room=${room}`}>
                <button type="submit">Go to room</button>
            </Link>
            <Link to="/"><button>Go to Home</button></Link>
        </div>
    );
}

export default TicTacToeLogin;