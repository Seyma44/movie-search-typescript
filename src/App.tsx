import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import MovieCenter from './components/MovieCenter/MovieCenter';
import DetailPage from './components/DetailPage/DetailPage';
import './App.scss';
import './Overwrite.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieCenter />} />
        <Route path="/detail/:imdbID" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
