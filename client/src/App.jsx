import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-y-auto bg-gray-100 px-4 pt-24">
        <Outlet /> {/* Active page or placeholder */}
      </div>
    </div>
  );
};

export default App;