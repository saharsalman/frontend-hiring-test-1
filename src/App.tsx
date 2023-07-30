import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ListTechnologies } from './pages/call-listing';
import { Login } from './pages/login';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/home" element={<ListTechnologies />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;