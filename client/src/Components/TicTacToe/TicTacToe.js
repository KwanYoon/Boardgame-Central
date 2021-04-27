import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import './TicTacToe.css';

let socket;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calculateDraw(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            return false;
        }
    }
    return true;
}

const Square = (props) => {
    return (
        <button className="square" onClick={props.handleClick}>
            {props.value}
        </button>
    );
}

const Board = (props) => {
    const square = (i) => {
        return <Square value={props.square[i]} handleClick={() => props.handleClick(i)} />;
    }

    return (
        <div>
            <div className="rows">
                {square(0)}
                {square(1)}
                {square(2)}
            </div>
            <div className="rows">
                {square(3)}
                {square(4)}
                {square(5)}
            </div>
            <div className="rows">
                {square(6)}
                {square(7)}
                {square(8)}
            </div>
        </div>
    );
}

const TicTacToe = ({ location }) => {
    // states
    const [square, setSquare] = useState(Array(9).fill(null));
    const [xTurn, setXTurn] = useState(true);
    const [room, setRoom] = useState(null);

    // constants
    const ENDPOINT = 'localhost:5000';

    // joining a room
    useEffect(() => {
        const { room } = queryString.parse(location.search);

        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io.connect(ENDPOINT, connectionOptions);

        setRoom(room);

        socket.emit('join', { room }, () => {
            // reaction to callback
        });

        // when unmounting
        return () => {
            socket.emit('dc');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    // effect on moving
    useEffect(() => {
        socket.on('moving', ({ newSquare, newTurn }) => {
            
            setSquare(newSquare);
            setXTurn(newTurn);
        });
    });

    // function to handle clicking
    const handleClick = (i) => {
        var newSquare = square;
        const newTurn = !xTurn;
        if (calculateWinner(newSquare) || newSquare[i]) {
            return;
        }
        if (xTurn) {
            newSquare[i] = 'X';
        } else {
            newSquare[i] = 'O';
        }
        
        socket.emit('move', { newSquare, newTurn, room });
    }

    // function to reset
    const reset = () => {
        var newSquare = Array(9).fill(null);
        const newTurn = true;
        socket.emit('move', { newSquare, newTurn, room });
    }

    // checking status of the game
    var statusCheck;
    if (calculateWinner(square)) {
        statusCheck = 'Winner: ' + calculateWinner(square);
    } else if (calculateDraw(square)) {
        statusCheck = 'Draw';
    } else if (xTurn) {
        statusCheck = 'X to go';
    } else {
        statusCheck = 'O to go';
    }

    return (
        <div>
            <div className="title">TicTacToe</div>
            <div className="board">
                <Board square={square} handleClick={(i) => handleClick(i)} />
            </div>
            <div className="sidebar">
                <div className="turn">{statusCheck}</div>
                <button onClick={() => reset()}>Reset Board</button>
                <Link to="/"><button>Go to Home</button></Link>
            </div>
        </div>
    );
}

export default TicTacToe;