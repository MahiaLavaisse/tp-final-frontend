import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import styles from './HomePage.module.css';
import { FiShield, FiZap, FiLock, FiAward, FiChevronRight } from 'react-icons/fi';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === featuresRef.current) {
              setFeaturesVisible(true);
            } else if (entry.target === testimonialsRef.current) {
              setTestimonialsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    
    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
    };
  }, []);

  const features = [
    {
      id: 1,
      icon: <FiShield size={42} />,
      title: "Seguridad de Grado Militar",
      description: "Encriptación AES-256 y protocolos Zero Trust para máxima protección"
    },
    {
      id: 2,
      icon: <FiZap size={42} />,
      title: "Rendimiento Optimizado",
      description: "Respuestas en menos de 100ms incluso bajo alta carga"
    },
    {
      id: 3,
      icon: <FiLock size={42} />,
      title: "Cumplimiento Normativo",
      description: "Certificaciones GDPR, HIPAA y SOC 2 Tipo II"
    },
    {
      id: 4,
      icon: <FiAward size={42} />,
      title: "Experiencia Premium",
      description: "Diseño galardonado con accesibilidad certificada"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      role: "CTO en TechInnovate",
      content: "La solución más robusta que hemos implementado. Redujo nuestros incidentes de seguridad en un 95% desde el primer mes.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      role: "Director de Seguridad",
      content: "Implementación impecable y documentación clara. Nuestros desarrolladores lo adoptaron en solo dos días.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Ana Torres",
      role: "CEO de SecureSystems",
      content: "El balance perfecto entre seguridad y experiencia de usuario. Nuestros clientes finalmente tienen paz mental.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const partners = [
    {
      id: 1,
      name: "Amazon Web Services",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png"
    },
    
    {
      id: 2,
      name: "Google Cloud",
      logo: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"
    },
    {
      id: 3,
      name: "Microsoft Azure",
      logo: "https://azure.microsoft.com/svghandler/ai-machine-learning/?width=600&height=315"
    },
    {
      id: 4,
      name: "IBM Cloud",
      logo: "https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg"
    }
  ];

  return (
    <div className={styles.homePage}>
      <Header />
      
      {/* Hero Section */}
      <section className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.innovationBadge}>
              <span>Tecnología Disruptiva</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span>Revolucionando</span> la seguridad digital
            </h1>
            <p className={styles.heroSubtitle}>
              Plataforma de autenticación de última generación para aplicaciones empresariales críticas
            </p>
          </div>
          <div className={styles.heroAnimation}>
            <div className={styles.cubeAnimation}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className={`${styles.featuresSection} ${featuresVisible ? styles.visible : ''}`}
      >
        <div className={styles.sectionHeader}>
          <h2>Arquitectura de vanguardia</h2>
          <p>Tecnologías avanzadas que definen el estándar de la industria</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={styles.featureCard}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className={`${styles.testimonialsSection} ${testimonialsVisible ? styles.visible : ''}`}
      >
        <div className={styles.sectionHeader}>
          <h2>Líderes que confían en nosotros</h2>
          <p>Testimonios de profesionales de la industria</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={styles.testimonialCard}
            >
              <div className={styles.testimonialContent}>
                <p>"{testimonial.content}"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className={styles.authorAvatar}
                  loading="lazy"
                />
                <div className={styles.authorInfo}>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <div className={styles.sectionHeader}>
              <h2>Nuestra Historia</h2>
            </div>
            <div className={styles.storyTimeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2018</div>
                <div className={styles.timelineContent}>
                  <h3>Fundación</h3>
                  <p>Nacimos en Tuculandia con la misión de resolver los problemas de seguridad más complejos.</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2020</div>
                <div className={styles.timelineContent}>
                  <h3>Primer Gran Hito</h3>
                  <p>Lanzamos nuestra primera versión empresarial adoptada por 3 compañías Fortune 500.</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2023</div>
                <div className={styles.timelineContent}>
                  <h3>Reconocimiento Global</h3>
                  <p>Ganadores del premio a la Innovación en Seguridad Digital en la conferencia mundial de ciberseguridad.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.storyImage}>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Equipo fundador trabajando" 
              className={styles.storyImg}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className={styles.partnersSection}>
        <div className={styles.sectionHeader}>
          <h2>Alianzas Tecnológicas</h2>
          <p>Colaboramos con los líderes de la industria</p>
        </div>
        <div className={styles.partnersGrid}>
          {partners.map(partner => (
            <div key={partner.id} className={styles.partnerLogo}>
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className={styles.partnerImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;