import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Product from './pages/Product.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Always shows Navbar
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <Aboutus /> },
      { path: '/contact', element: <Contact /> },
      { path: '/products', element: <Products /> },
      { path: '/product/:id', element: <Product /> },

      { path: '*', element: <div className="p-8 text-lg">Page under construction 🚧</div> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
