import React from 'react';
import HomePage from './pages/home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/portfolio-2">
      <HomePage />
    </BrowserRouter>
  );
}

export default App;
