import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Connect4.css';

const Connect4Login = () => {
    const [room, setRoom] = useState(null);

    const handleRoomId = (e) => {
        if (!room) {
            e.preventDefault();
        }
    };

    return (
        <div className="loginPageConnect4">
            <div className="titleConnect4">Connect 4</div>
            <input className="roomNameConnect4" placeholder="Room ID" type="text" onChange={(e) => setRoom(e.target.value)} /><br />
            <Link onClick={(e) => handleRoomId(e)} to={`/connect4?room=${room}`}>
                <button className="loginButtonConnect4" type="submit">Go to room</button>
            </Link>
            <Link to="/"><button className="loginButtonConnect4">Go to Home</button></Link>
            <div className="howToUseConnect4">How to play: Enter the same room ID as your friend and start playing!</div>
        </div>
    );
}

export default Connect4Login;