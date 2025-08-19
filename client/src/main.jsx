import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Products from './pages/Products';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Always shows Navbar
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <Aboutus /> },
      { path: '/partners', element: <Partners /> },
      { path: '/contact', element: <Contact /> },
      { path: '/products', element: <Products /> },
      { path: '*', element: <div className="p-8 text-lg">Page under construction 🚧</div> }
    ]
  }
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
