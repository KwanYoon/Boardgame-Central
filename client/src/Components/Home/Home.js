import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import TicTacToeImage from '../../Icons/TicTacToe.png';
import Connect4Image from '../../Icons/connect4.png';

const Home = () => {
    return (
        <div className="background">
            <h1 className="websiteName">Boardgame Central</h1>
            <div className="gameSection">
                <h1 className="gameTitle">TicTacToe</h1>
                <Link to="/tictactoelocal">
                    <button className="gameButton">TicTacToe Local<br /><img className="gameImage" src={TicTacToeImage} alt="TicTacToeImage" /></button>
                </Link>
                <Link to="/tictactoeonline">
                    <button className="gameButton">TicTacToe Online<br /><img className="gameImage" src={TicTacToeImage} alt="TicTacToeImage" /></button>
                </Link>
            </div>

            <div className="gameSection">
                <h1 className="gameTitle">Connect 4</h1>
                <Link to="/connect4local">
                    <button className="gameButton">Connect 4 Local<br /><img className="gameImage" src={Connect4Image} alt="Connect4Image" /></button>
                </Link>
                <Link to="/connect4online">
                    <button className="gameButton">Connect 4 Online<br /><img className="gameImage" src={Connect4Image} alt="Connect4Image" /></button>
                </Link>
            </div>
        </div>
    );
}
 
export default Home;