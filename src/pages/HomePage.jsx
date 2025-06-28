import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bienvenido a nuestra aplicación
          </h1>
          <p className={styles.heroSubtitle}>
            Sistema de autenticación con MongoDB, Express, React y Node.js
          </p>
          <div className={styles.heroActions}>
            <Link to="/register" className={styles.heroButton}>
              Comenzar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;