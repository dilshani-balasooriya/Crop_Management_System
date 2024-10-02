
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CropForm from './Components/CropForm';
import LandingPgae from './Components/LandingPgae';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPgae />} />
      <Route path="/crops-form" element={<CropForm />} />
      
    </Routes>
  </Router>
  );
}

export default App;
