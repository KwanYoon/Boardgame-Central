import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';
import TicTacToeLocal from './Components/TicTacToe/TicTacToeLocal';
import TicTacToeLogin from './Components/TicTacToe/TicTacToeLogin';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import Connect4Local from './Components/Connect4/Connect4Local';
import Connect4Login from './Components/Connect4/Connect4Login';
import Connect4 from './Components/Connect4/Connect4';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/tictactoelocal' component={TicTacToeLocal} />
                <Route exact path='/tictactoeonline' component={TicTacToeLogin} />
                <Route exact path='/tictactoe' component={TicTacToe} />
                <Route exact path='/connect4local' component={Connect4Local} />
                <Route exact path='/connect4online' component={Connect4Login} />
                <Route exact path='/connect4' component={Connect4} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;