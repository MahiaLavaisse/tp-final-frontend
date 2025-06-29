import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Ruta para la página principal con parámetro opcional */}
      <Route path="/" element={<HomePage />} />
      <Route path="/:section" element={<HomePage />} />
              <Route path="/seccion/:section" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />

      
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}

export default App;