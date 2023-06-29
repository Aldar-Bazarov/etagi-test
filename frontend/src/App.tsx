import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/Layout';
import { Home } from './pages/Home';
import { Floor } from './pages/Floor';
import { Apartment } from './pages/Apartment';

const App: React.FC = () => {
  return (
    <Routes>
       <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="floor/:id" element={<Floor />} />
        <Route path="apartment/:id" element={<Apartment />} />
       </Route>
    </Routes>
  );
};

export default App;