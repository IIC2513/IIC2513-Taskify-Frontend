import { Routes, Route } from 'react-router-dom';
import './App.css'
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import LogoutPage from './pages/Logout/Logout';
import Register from './pages/Register/Register';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/logout" element={<LogoutPage />} />
      {/* Solo navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
      </Route>
    </Routes>
  );
}

export default App
