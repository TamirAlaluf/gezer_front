import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import routes from './routes.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Submit from './pages/Submit.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/submit" element={<Submit />} />
    </Routes>
  </Router>
)
