import React from 'react';

import GlobalStyles from './styles/global';

import { BrowserRouter, Route } from 'react-router-dom';
import Board from './pages/Board';
import Home from './pages/Home';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/game/:gameId" component={Board} exact />
      </BrowserRouter>
    </>
  );
}

export default App;
