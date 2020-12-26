import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Board from './pages/Board';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Board} />
    </BrowserRouter>
  );
}

export default App;
