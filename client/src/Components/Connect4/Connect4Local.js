import React, { useState } from 'react';
import './Connect4.css'

const Square = (props) => {
    return (
        <div className="square">
            <div className="circle" style={{backgroundColor: props.color}} />
        </div>
    );
}

const Board = () => {
    const [column, setColumn] = useState([[], [], [], [], [], [], []]);
    const [color, setColor] = useState('red');

    const square = (i) => {
        return <Square color={i} />;
    }

    const handleClick = (i) => {
        var newColumn = column.slice();
        if (newColumn[i].length >= 6) {
            return;
        }
        newColumn[i].push(color);
        if (color === 'red') {
            setColor('yellow');
        } else {
            setColor('red');
        }
        setColumn(newColumn);
    }

    const columns = (i) => {
        var squares = i.slice().reverse();
        var len = squares.length;
        var output = [];
        for (let k = 0; k < 6 - len; k++) {
            output.push(square('#bbb'));
        }
        for (let k = 6 - len; k < 6; k++) {
            output.push(square(squares[k - (6 - len)]));
        }
        return output;
    }

    return (
        <div className="boardConnect4">
            <button className="columns" onClick={() => handleClick(0)}>
                {columns(column[0])}
            </button>
            <button className="columns" onClick={() => handleClick(1)}>
                {columns(column[1])}
            </button>
            <button className="columns" onClick={() => handleClick(2)}>
                {columns(column[2])}
            </button>
            <button className="columns" onClick={() => handleClick(3)}>
                {columns(column[3])}
            </button>
            <button className="columns" onClick={() => handleClick(4)}>
                {columns(column[4])}
            </button>
            <button className="columns" onClick={() => handleClick(5)}>
                {columns(column[5])}
            </button>
            <button className="columns" onClick={() => handleClick(6)}>
                {columns(column[6])}
            </button>
        </div>
    );
}

const Connect4Local = () => {
    return (
        <div>
            <div className="title">Connect 4</div>
            <Board />
        </div>
    );
}

export default Connect4Local;