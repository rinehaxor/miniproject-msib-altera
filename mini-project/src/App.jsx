import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieList from './compents/MovieList';
import User from './compents/User';
import { useAuth } from './hook/useAuth';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './hook/useAuth';
import UserPage from './pages/UserPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<MovieList />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<h1>Oppss error page 404</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

function ProtectedUser() {
  const { currentUser } = useAuth();
  return currentUser ? <User /> : <Navigate to="/login" replace />;
}

export default App;
