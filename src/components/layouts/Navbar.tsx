import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const items = [
    {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        command: () => navigate('/dashboard')
      },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      command: () => navigate('/users'),
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off'
    }
  ];

  const end = isAuthenticated ? (
    <Button label="Logout" icon="pi pi-sign-out" className="p-button-text" onClick={handleLogout} />
  ) : (
    <Button label="Login" icon="pi pi-sign-in" className="p-button-text" onClick={handleLogin} />
  );

  return (
    <div className="">
      <Menubar model={items} start={''} end={end} />
    </div>
  );
};

export default Navbar;
