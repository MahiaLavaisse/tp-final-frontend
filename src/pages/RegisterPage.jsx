import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import Alert from '../components/Alert';
import styles from './AuthPages.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validación en tiempo real
  useEffect(() => {
    const { password, confirmPassword } = formData;
    let newError = '';

    if (password && password.length < 8) {
      newError = 'La contraseña debe tener mínimo 8 caracteres';
    } else if (password && !/[A-Z]/.test(password)) {
      newError = 'Debe contener al menos una mayúscula';
    } else if (password && !/[0-9]/.test(password)) {
      newError = 'Debe contener al menos un número';
    } else if (password && confirmPassword && password !== confirmPassword) {
      newError = 'Las contraseñas no coinciden';
    }

    setError(newError);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación final antes de enviar
    if (error) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      // Extraer solo los campos necesarios
      const { name, email, password } = formData;
      const response = await registerUser({ name, email, password });
      
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      // Manejo detallado de errores
      let errorMessage = 'Error en el registro';
      
      if (err.message.includes('Error de validación')) {
        errorMessage = 'Datos inválidos: ' + err.message.split(':')[1];
      } else if (err.message.includes('email')) {
        errorMessage = 'El email ya está registrado';
      } else if (err.status === 0) {
        errorMessage = 'Error de red: Verifica tu conexión';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h1 className={styles.authTitle}>Crear Cuenta</h1>
        {error && <Alert type="error" message={error} />}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Mínimo 8 caracteres con mayúscula y número"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="submit" 
            className={`${styles.submitButton} ${styles.registerButton}`}
            disabled={isSubmitting || error}
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className={styles.authFooter}>
          <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;