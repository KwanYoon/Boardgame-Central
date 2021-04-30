import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Connect4.css'

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

const Connect4Local = () => {
    const [column, setColumn] = useState([Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null)]);
    const [color, setColor] = useState('red');
    const [winCount, setWinCount] = useState([0, 0]);

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
        newColumn[i][len] = color;
        if (color === 'red') {
            setColor('yellow');
        } else {
            setColor('red');
        }
        setColumn(newColumn);

        // checking if there is winner
        if (winnerCheck(column) === 'red') {
            setWinCount([winCount[0] + 1, winCount[1]])
        } else if (winnerCheck(column) === 'yellow') {
            setWinCount([winCount[0], winCount[1] + 1])
        }
    }

    // resetting board
    const reset = () => {
        setColor('red');
        setColumn([Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null)]);
    }

    var statusCheck;
    if (winnerCheck(column)) {
        statusCheck = 'Winner is: ' + winnerCheck(column);
    } else {
        statusCheck = 'Turn: ' + color;
    }

    return (
        <div>
            <div className="titleConnect4">Connect 4</div>
            <Board handleClick={(i) => handleClick(i)} columns={(i) => columns(i)} />
            <div className="sidebarConnect4">
                <div className="turnConnect4">
                    {statusCheck}
                    <br /><br />
                    {"Red wins: " + winCount[0] + ", Yellow wins: " + winCount[1]}
                </div>
                <button className="buttonConnect4" onClick={() => reset()}>Reset Game</button>
                <Link to="/"><button className="buttonConnect4">Go Home</button></Link>
            </div>
        </div>
    );
}

export default Connect4Local;