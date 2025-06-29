import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secciones disponibles
  const sections = [
    { id: 'caracteristicas', name: 'Características' },
    { id: 'testimonios', name: 'Testimonios' },
    { id: 'historia', name: 'Nuestra Historia' },
    { id: 'aliados', name: 'Aliados Tecnológicos' }
  ];

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
          {/* Menú desplegable de secciones */}
          <div 
            className={styles.sectionsDropdown}
            onMouseEnter={() => setIsSectionsOpen(true)}
            onMouseLeave={() => setIsSectionsOpen(false)}
          >
            <button className={styles.sectionsToggle}>
              <span>Secciones</span>
              <FiChevronDown size={16} />
            </button>
            
            {isSectionsOpen && (
              <div className={styles.sectionsMenu}>
                {sections.map(section => (
                  <NavLink 
                    key={section.id}
                    to={`/${section.id}`}
                    className={({ isActive }) => 
                      isActive 
                        ? `${styles.sectionLink} ${styles.activeSection}` 
                        : styles.sectionLink
                    }
                  >
                    {section.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          
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
            {/* Secciones en menú móvil */}
            <div className={styles.mobileSections}>
              <h3 className={styles.mobileSectionsTitle}>Explorar secciones</h3>
              {sections.map(section => (
                <Link 
                  key={section.id}
                  to={`/${section.id}`}
                  className={styles.mobileSectionLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.name}
                </Link>
              ))}
            </div>
            
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