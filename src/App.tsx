import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import DepotOperation from './pages/DepotOperation';
import Sale from './pages/Sale';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/depot',
    element: <DepotOperation />,
  },
  {
    path: '/sale',
    element: <Sale />,
  },
]);

function WrappedApp() {
  return <RouterProvider router={router} />;
}

export default WrappedApp;
