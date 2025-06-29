import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoPart}>Secure</span>
            <span className={styles.logoHighlight}>Auth</span>
          </Link>
        </div>

        {/* Menú de escritorio */}
        <nav className={styles.desktopNav}>
          {user ? (
            <div className={styles.userNav}>
              <span className={styles.userGreeting}>Hola, {user.name}</span>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              <button onClick={logout} className={styles.logoutButton}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className={styles.authNav}>
              <Link to="/login" className={styles.navLink}>
                Iniciar sesión
              </Link>
              <Link to="/register" className={styles.registerButton}>
                Registrarse
              </Link>
            </div>
          )}
        </nav>

        {/* Menú móvil */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            {user ? (
              <>
                <div className={styles.mobileUserInfo}>
                  <span className={styles.userGreeting}>Hola, {user.name}</span>
                </div>
                <Link 
                  to="/dashboard" 
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className={styles.mobileLogoutButton}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link 
                  to="/register" 
                  className={styles.mobileRegisterButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;