import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VideoEditor from './pages/VideoEditor';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/VideoEditor' element={<VideoEditor />} />
    </Routes>
  );
};

export default App;
