import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      {/* <Navbar /> */}
      <div className="container my-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
