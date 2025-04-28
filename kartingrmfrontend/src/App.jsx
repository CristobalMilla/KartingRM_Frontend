import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Karts from './components/Karts';
import Calendar from './components/Calendar';
import Rent from './components/Rent';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/karts" element={<Karts />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
