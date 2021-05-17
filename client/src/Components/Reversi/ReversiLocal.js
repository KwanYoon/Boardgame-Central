import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reversi.css';

// individual squares
const Square = () => {
    const handleClick = () => {
        
    }

    return (
        <button className="squareReversi" onClick={() => handleClick()} />
    )
}

// game board
const Board = () => {
    const [board, setBoard] = useState();
    return (
        <div className="boardReversi">
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
            <Square /><Square /><Square /><Square /><Square /><Square /><Square /><Square />
        </div>
    )
}

// main
const ReversiLocal = () => {
    return (
        <div>
            <div className="titleReversi">Reversi</div>
            <Board />
        </div>
    )
}

export default ReversiLocal;