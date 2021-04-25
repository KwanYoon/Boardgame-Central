import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Components/Home/Home';
import TikTacToe from './Components/TikTacToe/TikTacToe';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/tiktactoe' component={TikTacToe} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;