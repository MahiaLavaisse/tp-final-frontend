import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/api';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className={styles.loading}>Cargando...</div>;

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardCard}>
          <h1 className={styles.dashboardTitle}>Panel de Usuario</h1>
          {profile && (
            <div className={styles.profileInfo}>
              <div className={styles.profileSection}>
                <h2 className={styles.sectionTitle}>Información personal</h2>
                <p><span className={styles.infoLabel}>Nombre:</span> {profile.name}</p>
                <p><span className={styles.infoLabel}>Email:</span> {profile.email}</p>
              </div>
              <div className={styles.profileSection}>
                <h2 className={styles.sectionTitle}>Seguridad</h2>
                <button
                  onClick={logout}
                  className={styles.logoutButton}
                >
                  Cerrar sesión
                </button>
              </div>
              <div className={styles.profileSection}>
                <Link to={`/user/${user.id}`} className={styles.userLink}>
                  Ver mi página de usuario
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;