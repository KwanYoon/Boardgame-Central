import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import TicTacToeImage from '../../Icons/TicTacToe.png';

const Home = () => {
    return (
        <div className="background">
            <h1 className="websiteName">Boardgame Central</h1>
            <div className="gameSection">
                <h1 className="gameTitle">TicTacToe</h1>
                <Link to="/tictactoelocal">
                    <button className="gameButton">TicTacToe Local<br /><img className="gameImage" src={TicTacToeImage} alt="TicTacToeImg" /></button>
                </Link>
                <Link to="/tictactoeonline">
                    <button className="gameButton">TicTacToe Online<br /><img className="gameImage" src={TicTacToeImage} alt="TicTacToeImg" /></button>
                </Link>
            </div>
        </div>
    );
}
 
export default Home;