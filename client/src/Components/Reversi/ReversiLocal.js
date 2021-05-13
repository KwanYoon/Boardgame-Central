import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reversi.css';

// individual squares
const Square = () => {
    return (
        <button className="squareReversi" />
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