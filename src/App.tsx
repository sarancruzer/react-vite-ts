import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/layouts/AdminLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AdminPrivateRoute from './components/guards/AdminPrivateRoute';

const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserList = lazy(() => import('./pages/UserList'));

const adminRoutes = [
  { path: 'users', element: <UserList /> },
  { path: 'users/create', element: <UserList /> },
  { path: 'users/edit/:id', element: <UserList /> },
  { path: 'dashboard', element: <Dashboard /> }
];

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<AdminLayout />}>
            {adminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<AdminPrivateRoute>{route.element}</AdminPrivateRoute>}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
