import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminPrivateRouteProps {
  children: React.ReactNode;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default AdminPrivateRoute;
