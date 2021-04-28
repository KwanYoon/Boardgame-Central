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
        <div className="loginPage">
            <div className="title">TicTacToe</div>
            <input className="roomName" placeholder="Room ID" type="text" onChange={(e) => setRoom(e.target.value)} /><br />
            <Link onClick={(e) => handleRoomId(e)} to={`/tictactoe?room=${room}`}>
                <button className="loginButton" type="submit">Go to room</button>
            </Link>
            <Link to="/"><button className="loginButton">Go to Home</button></Link>
            <div className="howToUse">How to play: Enter the same room ID as your friend and start playing!</div>
        </div>
    );
}

export default TicTacToeLogin;