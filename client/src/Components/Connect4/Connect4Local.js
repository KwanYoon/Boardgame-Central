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
    const [column, setColumn] = useState([0, 0, 0, 0, 0, 0, 0]);

    const square = (i) => {
        return <Square color={i} />;
    }

    const handleClick = (i) => {
        var newColumn = column.slice();
        newColumn[i]++;
        setColumn(newColumn);
    }

    const columns = (i) => {
        var squares = [];
        for (let k = 0; k < 6; k++) {
            squares.push(square(i));
        }
        return squares;
    }

    return (
        <div>
            <button className="columns" onClick={() => handleClick(1)}>
                {columns('#bbb')}
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