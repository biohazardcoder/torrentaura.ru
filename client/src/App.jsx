import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layout/RootLayout';
import Home from './pages/Home/Home';
import GameDetailPage from './pages/GameDetail/GameDetail';
import { Error } from './pages/Error/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="*" element={<Error />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
