import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';
import TicTacToeLocal from './Components/TicTacToe/TicTacToeLocal';
import TicTacToeLogin from './Components/TicTacToe/TicTacToeLogin';
import TicTacToe from './Components/TicTacToe/TicTacToe';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/tictactoelocal' component={TicTacToeLocal} />
                <Route exact path='/tictactoeonline' component={TicTacToeLogin} />
                <Route exact path='/tictactoe' component={TicTacToe} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;