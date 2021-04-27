import React from 'react';
import { Link } from 'react-router-dom';

import './TicTacToe.css';

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

class Board extends React.Component {
    square(i) {
        return <Square value={this.props.square[i]} handleClick={() => this.props.handleClick(i)} />;
    }

    render() {
        return (
            <div>
                <div className="rows">
                    {this.square(0)}
                    {this.square(1)}
                    {this.square(2)}
                </div>
                <div className="rows">
                    {this.square(3)}
                    {this.square(4)}
                    {this.square(5)}
                </div>
                <div className="rows">
                    {this.square(6)}
                    {this.square(7)}
                    {this.square(8)}
                </div>
            </div>
        );
    }
}

class TicTacToeLocal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            square: Array(9).fill(null),
            xTurn: true,
        };
    }

    handleClick(i) {
        var square = this.state.square.slice();
        if (calculateWinner(square) || square[i]) {
            return;
        }
        if (this.state.xTurn) {
            square[i] = 'X';
        } else {
            square[i] = 'O';
        }
        this.setState({square: square});
        this.setState({xTurn: !this.state.xTurn});
    }

    reset() {
        var emptySquare = Array(9).fill(null);
        this.setState({square: emptySquare, xTurn: true});
    }

    render() {
        // checking status of the game
        var statusCheck;
        if (calculateWinner(this.state.square)) {
            statusCheck = 'Winner: ' + calculateWinner(this.state.square);
        } else if (calculateDraw(this.state.square)) {
            statusCheck = 'Draw';
        } else if (this.state.xTurn) {
            statusCheck = 'X to go';
        } else {
            statusCheck = 'O to go';
        }

        return (
            <div>
                <div className="title">TicTacToe</div>
                <div className="board">
                    <Board square={this.state.square} handleClick={(i) => this.handleClick(i)} />
                </div>
                <div className="sidebar">
                    <div className="turn">{statusCheck}</div>
                    <button onClick={() => this.reset()}>Reset Board</button>
                    <Link to="/"><button>Go to Home</button></Link>
                </div>
            </div>
        );
    }
}

export default TicTacToeLocal;