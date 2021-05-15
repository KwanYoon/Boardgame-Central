import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reversi.css';

// individual squares
const Square = () => {
    const handleClick = () => {
        console.log("this works");
    }

    return (
        <button className="squareReversi" onClick={() => handleClick()} />
    )
}

// game board
const Board = () => {
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