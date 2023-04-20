import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MovieList from './compents/MovieList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/daftar-film">Daftar Film</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daftar-film" element={<MovieList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
