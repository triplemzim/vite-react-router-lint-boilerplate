import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function WrappedApp() {
  return <RouterProvider router={router} />;
}

export default WrappedApp;
