import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

function ProtectedRoute({ element, ...rest }) {
  const { user } = useAuth();

  return user ? <Route element={element} {...rest} /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
