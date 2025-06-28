import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import styles from './UserPage.module.css';

const UserPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.userPage}>
      <Header />
      <div className={styles.userContainer}>
        <div className={styles.userCard}>
          <h1 className={styles.userTitle}>Página de Usuario</h1>
          <p className={styles.userId}>ID del usuario: {id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;