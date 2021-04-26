import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import TicTacToeLogin from './Components/TicTacToe/TicTacToeLogin';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/tictactoe' component={TicTacToe} />
                <Route exact path='/tictactoeonline' component={TicTacToeLogin} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;