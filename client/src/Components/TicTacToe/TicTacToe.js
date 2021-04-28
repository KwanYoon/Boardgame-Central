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
    const [move, setMove] = useState(null);
    const [winCount, setWinCount] = useState(0);
    const [play, setPlay] = useState(null);

    // constants, variables
    const ENDPOINT = 'localhost:5000';

    // joining a room
    useEffect(() => {
        // making a room based on current url
        const { room } = queryString.parse(location.search);

        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io.connect(ENDPOINT, connectionOptions);

        setRoom(room);

        // join the room
        socket.emit('join', { room }, (error) => {
            console.log(error);
        });

        // when unmounting
        return () => {
            socket.emit('dc', { room });
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    // socket effects
    useEffect(() => {
        // on move
        socket.on('moving', ({ newSquare, newTurn }) => {
            setSquare(newSquare);
            setXTurn(newTurn);
        });

        // when player is x
        socket.on('xmove', () => {
            setMove('X');
        });

        // when player is o
        socket.on('omove', () => {
            setMove('O');
            socket.emit('play', room);
        });

        // when game starts
        socket.on('playStart', () => {
            setPlay(true);
        });

        // on move switch
        socket.on('changeTurn', () => {
            if (move === 'X') {
                setMove('O');
            } else {
                setMove('X');
            }
        });

        // when other player leaves
        socket.on('alertLeave', () => {
            setPlay(false);
        });
    });

    // function to handle clicking
    const handleClick = (i) => {
        var newSquare = square;
        const newTurn = !xTurn;

        // if there is winner or square already exists
        if (calculateWinner(newSquare) || newSquare[i]) {
            return;
        }

        if (xTurn && move === 'X') {
            newSquare[i] = 'X';
        } else if (!xTurn && move === 'O') {
            newSquare[i] = 'O';
        } else {
            return;
        }

        if (calculateWinner(newSquare) === move) {
            setWinCount(winCount + 1);
        }
        
        socket.emit('move', { newSquare, newTurn, room });
    }

    // function to reset
    const reset = () => {
        var newSquare = Array(9).fill(null);
        const newTurn = true;
        socket.emit('reset', room);
        socket.emit('move', { newSquare, newTurn, room });
    }

    // checking if room full
    var fullRoom;
    if (!move) {
        fullRoom = true;
    } else {
        fullRoom = false;
    }

    // checking if game started
    var gameStart;
    if (!play) {
        gameStart = false;
    } else {
        gameStart = true;
    }

    // checking status of the game
    var statusCheck;
    if (calculateWinner(square)) {
        statusCheck = 'Winner: ' + calculateWinner(square);
    } else if (calculateDraw(square)) {
        statusCheck = 'Draw';
    } else if (xTurn) {
        statusCheck = 'X to move';
    } else {
        statusCheck = 'O to move';
    }

    if (fullRoom) {
        return (<div className="title">This room is full</div>);
    } else if (!gameStart) {
        return (<div className="title">Waiting for other player. Try resetting if game does not start immediately.</div>);
    } else {
        return (
            <div>
                <div className="title">TicTacToe</div>
                <div className="board">
                    <Board square={square} handleClick={(i) => handleClick(i)} />
                </div>
                <div className="sidebar">
                    <div className="turn">
                        {statusCheck}
                        <br /><br />
                        {"You are " + move}
                        <br />
                        {"Wins: " + winCount}
                    </div>
                    <button className="tictactoeButton" onClick={() => reset()}>Reset Board</button>
                    <Link to="/"><button className="tictactoeButton">Go to Home</button></Link>
                </div>
            </div>
        );
    }
}

export default TicTacToe;