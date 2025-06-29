import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/profileService';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import { FiUser, FiEdit, FiSave, FiX, FiShield, FiMail, FiLink, FiGlobe, FiPhone, FiBook, FiAward } from 'react-icons/fi';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: '',
    website: '',
    interests: ''
  });
  const [hovered, setHovered] = useState(false);
  const editFormRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        let profileData = response.data;
        
        if (!profileData) {
          // Crear perfil inicial si no existe
          profileData = {
            name: user.name || user.email.split('@')[0],
            email: user.email,
            bio: '',
            phone: '',
            website: '',
            interests: ''
          };
          await updateUserProfile(profileData);
        }
        
        setProfile(profileData);
        setFormData({
          name: profileData.name,
          bio: profileData.bio || '',
          phone: profileData.phone || '',
          website: profileData.website || '',
          interests: profileData.interests || ''
        });
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        name: formData.name,
        bio: formData.bio,
        phone: formData.phone,
        website: formData.website,
        interests: formData.interests
      };
      
      await updateUserProfile(updatedProfile);
      setProfile(updatedProfile);
      setEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingAnimation}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
      </div>
      <p>Cargando tu panel...</p>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <Header />
      
      {/* Fondo animado */}
      <div className={styles.animatedBackground}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
      </div>
      
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardCard}>
          <div className={styles.userHeader}>
            <div className={styles.userAvatar}>
              <FiUser size={36} />
              <div className={styles.statusIndicator}></div>
            </div>
            <div>
              <div className={styles.nameContainer}>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.nameInput}
                    ref={editFormRef}
                  />
                ) : (
                  <h1 className={styles.dashboardTitle}>{profile.name}</h1>
                )}
                <button 
                  className={styles.editButton}
                  onClick={() => {
                    if (editing) {
                      handleSave();
                    } else {
                      setEditing(true);
                      setTimeout(() => {
                        editFormRef.current?.focus();
                      }, 0);
                    }
                  }}
                >
                  {editing ? <FiSave size={20} /> : <FiEdit size={20} />}
                </button>
                {editing && (
                  <button 
                    className={styles.cancelButton}
                    onClick={() => setEditing(false)}
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
              <p className={styles.userEmail}>{profile.email}</p>
              <p className={styles.welcomeMessage}>Bienvenido a tu espacio seguro</p>
            </div>
          </div>
          
          {/* Sección de descripción/bio */}
          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>
              <FiUser className={styles.sectionIcon} />
              Sobre ti
            </h2>
            {editing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className={styles.bioInput}
                placeholder="Cuéntanos algo sobre ti..."
                rows="4"
              />
            ) : (
              <p className={styles.bioText}>
                {profile.bio || 'Aún no has agregado una descripción sobre ti.'}
              </p>
            )}
          </div>
          
          {/* Sección de información personal */}
          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>
              <FiShield className={styles.sectionIcon} />
              Información personal
            </h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <FiMail className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>{profile.email}</span>
                </div>
              </div>
              
              {editing ? (
                <div className={styles.infoItem}>
                  <FiPhone className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Teléfono</span>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.infoInput}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              ) : profile.phone ? (
                <div className={styles.infoItem}>
                  <FiPhone className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Teléfono</span>
                    <span className={styles.infoValue}>{profile.phone}</span>
                  </div>
                </div>
              ) : null}
              
              {editing ? (
                <div className={styles.infoItem}>
                  <FiGlobe className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Sitio web</span>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className={styles.infoInput}
                      placeholder="https://tu-sitio.com"
                    />
                  </div>
                </div>
              ) : profile.website ? (
                <div className={styles.infoItem}>
                  <FiGlobe className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Sitio web</span>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                      {profile.website}
                    </a>
                  </div>
                </div>
              ) : null}
              
              {editing ? (
                <div className={styles.infoItem}>
                  <FiBook className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Intereses</span>
                    <input
                      type="text"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      className={styles.infoInput}
                      placeholder="Seguridad, programación, IA..."
                    />
                  </div>
                </div>
              ) : profile.interests ? (
                <div className={styles.infoItem}>
                  <FiBook className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Intereses</span>
                    <span className={styles.infoValue}>{profile.interests}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          
          {/* Sección de acciones */}
          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>
              <FiAward className={styles.sectionIcon} />
              Acciones
            </h2>
            <div className={styles.buttonGroup}>
              <button
                onClick={logout}
                className={styles.logoutButton}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span>Cerrar sesión</span>
                {hovered && <div className={styles.logoutEffect}></div>}
              </button>
              
              <Link 
                to={`/user/${user.id}`} 
                className={styles.userLink}
              >
                <span>Ver mi perfil público</span>
              </Link>
            </div>
          </div>
          
          {/* Animación de fondo interactiva */}
          <div className={styles.interactiveGrid}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={styles.gridDot}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;