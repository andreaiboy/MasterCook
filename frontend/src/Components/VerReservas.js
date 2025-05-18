import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerReservas = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo de reservas
  const [reservas, setReservas] = useState([
    {
      id: 1,
      taller: "Cocina Italiana",
      fecha: "2023-11-15",
      hora: "10:00 - 12:00",
      instructor: "Chef Marco"
    },
    {
      id: 2,
      taller: "Repostería Francesa",
      fecha: "2023-11-20",
      hora: "16:00 - 18:00",
      instructor: "Chef Sophie"
    },
    {
      id: 3,
      taller: "Cocina Asiática",
      fecha: new Date().toISOString().split('T')[0], // Reserva para hoy (formato YYYY-MM-DD)
      hora: "18:00 - 20:00",
      instructor: "Chef Li"
    }
  ]);

  // Estilos con la paleta de colores
  const styles = {
    mainContainer: {
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      fontFamily: "'Century Gothic', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column'
    },
    nav: {
      backgroundColor: '#D94F4F',
      padding: '15px 0',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    navButton: {
      color: '#FFF3E2',
      background: 'none',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      padding: '8px 20px',
      margin: '0 10px',
      borderRadius: '20px',
      transition: 'all 0.3s',
      fontSize: '14px',
      textTransform: 'uppercase'
    },
    contentContainer: {
      flex: 1,
      padding: '20px',
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto'
    },
    title: {
      color: '#333333',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center'
    },
    reservaCard: {
      backgroundColor: 'white',
      border: '1px solid #EEE',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      borderLeft: '4px solid #6B8E23'
    },
    reservaTitle: {
      color: '#D94F4F',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    reservaMeta: {
      color: '#666666',
      margin: '8px 0',
      display: 'flex',
      alignItems: 'center'
    },
    metaIcon: {
      marginRight: '10px',
      color: '#6B8E23'
    },
    fechaBadge: {
      backgroundColor: '#FFF3E2',
      color: '#6B8E23',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'inline-block',
      marginRight: '10px'
    },
    hoyBadge: {
      backgroundColor: '#D94F4F',
      color: 'white'
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Formatear fecha en español usando Intl
  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(fecha);
  };

  // Verificar si una fecha es hoy
  const esHoy = (fechaStr) => {
    const hoy = new Date();
    const fecha = new Date(fechaStr);
    return hoy.toDateString() === fecha.toDateString();
  };

  return (
    <div style={styles.mainContainer}>
      {/* Menú de navegación */}
      <nav style={styles.nav}>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/navegar')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FAFAFA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Talleres
        </button>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/reservartaller')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FAFAFA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Reservar
        </button>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/verreservas')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FAFAFA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Mis Reservas
        </button>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/perfil')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FAFAFA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Perfil
        </button>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/pago')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FAFAFA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Pago
        </button>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FAFAFA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenido principal */}
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>Mis Reservas</h1>
        
        {reservas.map(reserva => (
          <div key={reserva.id} style={styles.reservaCard}>
            <div style={{ 
              ...styles.fechaBadge,
              ...(esHoy(reserva.fecha) && styles.hoyBadge)
            }}>
              {esHoy(reserva.fecha) ? 'HOY' : formatFecha(reserva.fecha)}
            </div>
            <h3 style={styles.reservaTitle}>{reserva.taller}</h3>
            <p style={styles.reservaMeta}>
              <span style={styles.metaIcon}>🕒</span>
              <strong>Horario:</strong> {reserva.hora}
            </p>
            <p style={styles.reservaMeta}>
              <span style={styles.metaIcon}>👨‍🍳</span>
              <strong>Instructor:</strong> {reserva.instructor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerReservas;