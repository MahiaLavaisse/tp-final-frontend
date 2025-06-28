import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>MiApp</Link>
        </div>
        <div className={styles.navContainer}>
          {user ? (
            <div className={styles.userNav}>
              <span className={styles.userGreeting}>Hola, {user.name}</span>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              <button
                onClick={logout}
                className={styles.logoutButton}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className={styles.authNav}>
              <Link to="/login" className={styles.navLink}>Iniciar sesión</Link>
              <Link to="/register" className={styles.registerButton}>Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;