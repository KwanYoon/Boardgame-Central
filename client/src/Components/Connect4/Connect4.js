import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Connect4.css'

let socket;

// constants
const HEIGHT = 6;
const WIDTH = 7;
const LIMIT = 3;

// function to check the length of the column given
function columnLength(column) {
    var count = 0;
    while (column[count]) {
        count++;
    }
    return count;
}

// function to check if there is a winner
function winnerCheck(columns) {
    // horizontal check
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH - LIMIT; j++) {
            if (columns[j][i] && columns[j][i] === columns[j + 1][i] &&
                columns[j][i] === columns[j + 2][i] && columns[j][i] === columns[j + 3][i]) {
                    return columns[j][i];
            }
        }
    }

    // vertical check
    for (let i = 0; i < HEIGHT - LIMIT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (columns[j][i] && columns[j][i] === columns[j][i + 1] &&
                columns[j][i] === columns[j][i + 2] && columns[j][i] === columns[j][i + 3]) {
                    return columns[j][i];
            }
        }
    }

    // top-right diagonal check
    for (let i = 0; i < HEIGHT - LIMIT; i++) {
        for (let j = 0; j < WIDTH - LIMIT; j++) {
            if (columns[j][i] && columns[j][i] === columns[j + 1][i + 1] &&
                columns[j][i] === columns[j + 2][i + 2] && columns[j][i] === columns[j + 3][i + 3]) {
                    return columns[j][i];
            }
        }
    }

    // bottom-right diagonal check
    for (let i = LIMIT; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH - LIMIT; j++) {
            if (columns[j][i] && columns[j][i] === columns[j + 1][i - 1] &&
                columns[j][i] === columns[j + 2][i - 2] && columns[j][i] === columns[j + 3][i - 3]) {
                    return columns[j][i];
            }
        }
    }

    // no winner
    return false;
}

// individual square
const Square = (props) => {
    return (
        <div className="squareConnect4">
            <div className="circleConnect4" style={{backgroundColor: props.color}} />
        </div>
    );
}

// game board
const Board = (props) => {
    return (
        <div >
            <button className="columnsConnect4" onClick={() => props.handleClick(0)}>
                {props.columns(0)}
            </button>
            <button className="columnsConnect4" onClick={() => props.handleClick(1)}>
                {props.columns(1)}
            </button>
            <button className="columnsConnect4" onClick={() => props.handleClick(2)}>
                {props.columns(2)}
            </button>
            <button className="columnsConnect4" onClick={() => props.handleClick(3)}>
                {props.columns(3)}
            </button>
            <button className="columnsConnect4" onClick={() => props.handleClick(4)}>
                {props.columns(4)}
            </button>
            <button className="columnsConnect4" onClick={() => props.handleClick(5)}>
                {props.columns(5)}
            </button>
            <button className="columnsConnect4" onClick={() => props.handleClick(6)}>
                {props.columns(6)}
            </button>
        </div>
    );
}

const Connect4 = ({ location }) => {
    const [column, setColumn] = useState([Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null)]);
    const [color, setColor] = useState('red');
    const [room, setRoom] = useState(null);
    const [move, setMove] = useState(null);
    const [play, setPlay] = useState(null);
    const [winCount, setWinCount] = useState(0);

    // constants, variables
    const ENDPOINT = 'https://boardgame-central.herokuapp.com/';

    // creating / joining a room
    useEffect (() => {
        // making a room based on current url
        const { room } = queryString.parse(location.search);

        var connectionOptions = {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io.connect(ENDPOINT, connectionOptions);

        setRoom(room);

        // joining room
        socket.emit('joinConnect4', { room }, (error) => {
            console.log(error);
        });

        // when unmounting
        return () => {
            socket.emit('dcConnect4', { room });
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    // socket effects
    useEffect(() => {
        // moving
        socket.on('movingConnect4', ({ newColumn, newColor }) => {
            setColumn(newColumn);
            setColor(newColor);
        });

        // when red move
        socket.on('redmove', () => {
            setMove('red');
        });

        // when yellow move
        socket.on('yellowmove', () => {
            setMove('yellow');
            socket.emit('playConnect4', room);
        });

        // when game starts
        socket.on('playStartConnect4', () => {
            console.log("this works");
            setPlay(true);
        });

        // on move switch
        socket.on('changeColorConnect4', () => {
            if (move === 'red') {
                setMove('yellow');
            } else {
                setMove('red');
            }
        });

        // when other player leaves
        socket.on('alertLeaveConnect4', () => {
            setPlay(false);
        });
    });

    // creating a square based on given color
    const square = (i) => {
        return <Square color={i} key={Math.random().toString(36).substr(2, 9)} />;
    }

    // creating column number i
    const columns = (i) => {
        var squares = column[i].slice();
        var len = columnLength(squares);
        squares.reverse();
        var output = Array(6);
        var k = 0;
        for ( ; k < 6 - len; k++) {
            output[k] = square('#bbb');
        }
        for ( ; k < 6; k++) {
            output[k] = square(squares[k]);
        }
        return output;
    }

    // when column clicked
    const handleClick = (i) => {
        var newColumn = column.slice();
        var len = columnLength(newColumn[i]);

        // if there is winner or length is 6
        if (winnerCheck(column) || len >= 6) {
            return;
        }

        // set and change color
        var newColor;
        if (move === 'red' && color === 'red') {
            newColor = 'yellow';
        } else if (move === 'yellow' && color === 'yellow') {
            newColor = 'red';
        } else {
            return;
        }
        // make move
        newColumn[i][len] = color;

        setColor(newColor);
        setColumn(newColumn);

        if (winnerCheck(newColumn) === move) {
            setWinCount(winCount + 1);
        }

        socket.emit('moveConnect4', { newColumn, newColor, room });
    }

    // resetting board
    const reset = () => {
        const newColor = 'red';
        const newColumn = ([Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null)]);
        socket.emit('resetConnect4', room);
        socket.emit('moveConnect4', { newColumn, newColor, room });
    }

    // checking if room is full
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

    // checking current status of the game
    var statusCheck;
    if (winnerCheck(column)) {
        statusCheck = 'Winner is: ' + winnerCheck(column);
    } else {
        statusCheck = 'Turn: ' + color;
    }

    if (fullRoom) {
        return (
            <div className="loginPageConnect4">
                <div className="titleConnect4">This room is full</div>
                <Link to="/"><button className="buttonConnect4">Go to Home</button></Link>
            </div>
        );
    } else if (!gameStart) {
        return (
            <div className="loginPageConnect4">
                <div className="titleConnect4">Waiting for other player. Try resetting if game does not start immediately.<br />Your code is : {room}</div>
                <Link to="/"><button className="buttonConnect4">Go to Home</button></Link>
            </div>
        );
    } else {
        return (
            <div>
                <div className="titleConnect4">Connect 4</div>
                <Board handleClick={(i) => handleClick(i)} columns={(i) => columns(i)} />
                <div className="sidebarConnect4">
                    <div className="turnConnect4">
                        {statusCheck}
                        <br />
                        {"You are: " + move}
                        <br /><br />
                        {"Wins: " + winCount}
                    </div>
                    <button className="buttonConnect4" onClick={() => reset()}>Reset Game</button>
                    <Link to="/"><button className="buttonConnect4">Go Home</button></Link>
                </div>
            </div>
        );
    }
}

export default Connect4;