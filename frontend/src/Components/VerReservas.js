import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerReservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const AUTH_API_URL = process.env.REACT_APP_RESERVAS_API || 'http://localhost:5003';

  // Obtener el id_usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const id_usuario = user?.id_usuario;

  useEffect(() => {
    if (!id_usuario) {
      navigate('/login');
      return;
    }

    axios.get(`${AUTH_API_URL}/reservas/${id_usuario}`)
      .then(response => {
        const datos = response.data.reservas.map(r => ({
          id: r.id_reserva,
          taller: r.curso,
          fecha: r.fecha,
          hora: 'Horario no disponible', // puedes agregarlo si lo tienes en la BD
          instructor: 'Instructor no disponible',
          estadoPago: r.pagado === 1 ? 'Pagado' : 'Pendiente',
          estadoReserva: r.estado,
          descripcion: `Método de pago: ${r.metodo_pago || 'N/A'}`,
          ubicacion: `Código: ${r.codigo_confirmacion || 'N/A'}`
        }));
        setReservas(datos);
      })
      .catch(error => {
        console.error("Error al obtener reservas", error);
      });
  }, [id_usuario, navigate]);
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
    filtersContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '10px'
    },
    searchInput: {
      padding: '10px 15px',
      borderRadius: '20px',
      border: '1px solid #EEE',
      width: '300px',
      fontSize: '14px'
    },
    filterButton: {
      padding: '8px 15px',
      borderRadius: '20px',
      border: 'none',
      backgroundColor: '#EEE',
      cursor: 'pointer',
      margin: '0 5px',
      transition: 'all 0.3s',
      fontSize: '14px'
    },
    activeFilter: {
      backgroundColor: '#D94F4F',
      color: 'white'
    },
    reservaCard: {
      backgroundColor: 'white',
      border: '1px solid #EEE',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      borderLeft: '4px solid #6B8E23',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    reservaCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
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
    },
    estadoContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px'
    },
    estadoPago: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    pagado: {
      backgroundColor: '#E6F7E6',
      color: '#2E7D32'
    },
    pendiente: {
      backgroundColor: '#FFF3E0',
      color: '#E65100'
    },
    estadoReserva: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    confirmada: {
      backgroundColor: '#E3F2FD',
      color: '#1565C0'
    },
    cancelada: {
      backgroundColor: '#FFEBEE',
      color: '#C62828'
    },
    completada: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#666'
    },
    modalTitle: {
      color: '#D94F4F',
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    modalSection: {
      marginBottom: '15px'
    },
    modalSectionTitle: {
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333'
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

  // Verificar si una reserva es pasada
  const esPasada = (fechaStr) => {
    const hoy = new Date();
    const fecha = new Date(fechaStr);
    return fecha < hoy;
  };

  // Filtrar reservas según los criterios seleccionados
  const reservasFiltradas = reservas.filter(reserva => {
    // Filtro por tipo (activas/pasadas/todas)
    const cumpleFiltro = 
      filtro === 'todas' || 
      (filtro === 'activas' && !esPasada(reserva.fecha)) || 
      (filtro === 'pasadas' && esPasada(reserva.fecha)) ||
      (filtro === 'canceladas' && reserva.estadoReserva === 'Cancelada');
    
    // Filtro por búsqueda
    const cumpleBusqueda = 
      reserva.taller.toLowerCase().includes(busqueda.toLowerCase()) ||
      reserva.instructor.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltro && cumpleBusqueda;
  });

  // Abrir modal con detalles de la reserva
  const abrirDetalles = (reserva) => {
    setReservaSeleccionada(reserva);
  };

  // Cerrar modal
  const cerrarDetalles = () => {
    setReservaSeleccionada(null);
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
        
        {/* Filtros y búsqueda */}
        <div style={styles.filtersContainer}>
          <input
            type="text"
            placeholder="Buscar por taller o instructor..."
            style={styles.searchInput}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          
          <div>
            <button 
              style={{...styles.filterButton, ...(filtro === 'todas' && styles.activeFilter)}}
              onClick={() => setFiltro('todas')}
            >
              Todas
            </button>
            <button 
              style={{...styles.filterButton, ...(filtro === 'activas' && styles.activeFilter)}}
              onClick={() => setFiltro('activas')}
            >
              Activas
            </button>
            <button 
              style={{...styles.filterButton, ...(filtro === 'pasadas' && styles.activeFilter)}}
              onClick={() => setFiltro('pasadas')}
            >
              Pasadas
            </button>
            <button 
              style={{...styles.filterButton, ...(filtro === 'canceladas' && styles.activeFilter)}}
              onClick={() => setFiltro('canceladas')}
            >
              Canceladas
            </button>
          </div>
        </div>
        
        {/* Listado de reservas */}
        {reservasFiltradas.length > 0 ? (
          reservasFiltradas.map(reserva => (
            <div 
              key={reserva.id} 
              style={styles.reservaCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              onClick={() => abrirDetalles(reserva)}
            >
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
              
              <div style={styles.estadoContainer}>
                <span style={{
                  ...styles.estadoPago,
                  ...(reserva.estadoPago === 'Pagado' ? styles.pagado : styles.pendiente)
                }}>
                  {reserva.estadoPago}
                </span>
                <span style={{
                  ...styles.estadoReserva,
                  ...(reserva.estadoReserva === 'Confirmada' ? styles.confirmada : 
                       reserva.estadoReserva === 'Cancelada' ? styles.cancelada : 
                       styles.completada)
                }}>
                  {reserva.estadoReserva}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron reservas que coincidan con los criterios de búsqueda.</p>
        )}
      </div>

      {/* Modal de detalles de reserva */}
      {reservaSeleccionada && (
        <div style={styles.modalOverlay} onClick={cerrarDetalles}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={cerrarDetalles}>×</button>
            
            <h2 style={styles.modalTitle}>{reservaSeleccionada.taller}</h2>
            
            <div style={styles.modalSection}>
              <div style={styles.modalSectionTitle}>Fecha y Hora</div>
              <div>{formatFecha(reservaSeleccionada.fecha)} - {reservaSeleccionada.hora}</div>
            </div>
            
            <div style={styles.modalSection}>
              <div style={styles.modalSectionTitle}>Instructor</div>
              <div>{reservaSeleccionada.instructor}</div>
            </div>
            
            <div style={styles.modalSection}>
              <div style={styles.modalSectionTitle}>Ubicación</div>
              <div>{reservaSeleccionada.ubicacion}</div>
            </div>
            
            <div style={styles.modalSection}>
              <div style={styles.modalSectionTitle}>Descripción</div>
              <div>{reservaSeleccionada.descripcion}</div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div>
                <div style={styles.modalSectionTitle}>Estado del Pago</div>
                <span style={{
                  ...styles.estadoPago,
                  ...(reservaSeleccionada.estadoPago === 'Pagado' ? styles.pagado : styles.pendiente),
                  padding: '6px 12px',
                  fontSize: '14px'
                }}>
                  {reservaSeleccionada.estadoPago}
                </span>
              </div>
              
              <div>
                <div style={styles.modalSectionTitle}>Estado de la Reserva</div>
                <span style={{
                  ...styles.estadoReserva,
                  ...(reservaSeleccionada.estadoReserva === 'Confirmada' ? styles.confirmada : 
                       reservaSeleccionada.estadoReserva === 'Cancelada' ? styles.cancelada : 
                       styles.completada),
                  padding: '6px 12px',
                  fontSize: '14px'
                }}>
                  {reservaSeleccionada.estadoReserva}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerReservas;