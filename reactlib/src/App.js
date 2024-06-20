import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/pages/admin/Admin';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/admin/user/search" element={<Admin />} />
      </Routes>

    </div>
  );
}
export default App;
