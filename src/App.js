import React from 'react';

import GlobalStyles from './styles/global';

import { BrowserRouter, Route } from 'react-router-dom';
import Board from './pages/Board';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Route path="/" component={Board} />
      </BrowserRouter>
    </>
  );
}

export default App;
