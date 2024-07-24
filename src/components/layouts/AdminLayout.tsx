import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="container my-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
