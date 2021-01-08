import React from 'react';

import GlobalStyles from './styles/global';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Board from './pages/Board';
import Home from './pages/Home';
import Waiting from './pages/Waiting';
import BlackBoard from './pages/BlackBoard';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/matchmaking/:gameId" component={Waiting} />
          <Route path="/game/:gameId" component={Board} />
          <Route path="/bgame/:gameId" component={BlackBoard} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
