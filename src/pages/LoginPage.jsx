import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import Alert from '../components/Alert';
import styles from './AuthPages.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return setError('Todos los campos son obligatorios');
    }

    try {
      const response = await loginUser({ email, password });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el inicio de sesión');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h1 className={styles.authTitle}>Iniciar Sesión</h1>
        {error && <Alert type="error" message={error} />}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button 
            type="submit" 
            className={styles.submitButton}
          >
            Ingresar
          </button>
        </form>
        <div className={styles.authFooter}>
          <Link to="/register">Crear una cuenta</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;