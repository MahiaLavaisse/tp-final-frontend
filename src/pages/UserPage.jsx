import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import styles from './UserPage.module.css';
import { FiUser, FiInfo, FiMail, FiPhone, FiGlobe, FiBook } from 'react-icons/fi';
import { getProfile } from '../services/profileService';

const UserPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // En una aplicación real, haríamos una solicitud a la API con el id
        const profile = getProfile();
        if (profile) {
          setUserData(profile);
        } else {
          setUserData({
            name: "Usuario no encontrado",
            bio: "Este usuario no ha configurado su perfil aún."
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.userPage}>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAnimation}>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
            <div className={styles.cube}></div>
          </div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userPage}>
      <Header />
      
      {/* Fondo animado */}
      <div className={styles.animatedBackground}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
      </div>
      
      <div className={styles.userContainer}>
        <div className={styles.userCard}>
          <div className={styles.userHeader}>
            <div className={styles.userAvatar}>
              <div className={styles.avatarContent}>
                <FiUser size={40} />
              </div>
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{userData.name}</h1>
              <p className={styles.userId}>ID: {id}</p>
            </div>
          </div>
          
          {userData.bio && (
            <div className={styles.profileSection}>
              <h2 className={styles.sectionTitle}>
                <FiInfo className={styles.sectionIcon} />
                Sobre mí
              </h2>
              <p className={styles.userBio}>{userData.bio}</p>
            </div>
          )}
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <FiMail className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{userData.email}</span>
              </div>
            </div>
            
            {userData.phone && (
              <div className={styles.infoItem}>
                <FiPhone className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Teléfono</span>
                  <span className={styles.infoValue}>{userData.phone}</span>
                </div>
              </div>
            )}
            
            {userData.website && (
              <div className={styles.infoItem}>
                <FiGlobe className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Sitio web</span>
                  <a href={userData.website} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                    {userData.website}
                  </a>
                </div>
              </div>
            )}
            
            {userData.interests && (
              <div className={styles.infoItem}>
                <FiBook className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Intereses</span>
                  <span className={styles.infoValue}>{userData.interests}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Efecto de partículas */}
          <div className={styles.particles}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className={styles.particle}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;