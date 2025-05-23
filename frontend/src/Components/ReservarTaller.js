import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComidaItaliana from './ComidaItaliana.jpg';
import ReposFrancesa from './ReposFrancesa.jpg';
import ComidaAsiatica from './ComidaAsiatica.jpg';
import Pago from './Pago';

const ReservarTaller = () => {
  const navigate = useNavigate();
  const [talleres, setTalleres] = useState([]);
  const [tallerSeleccionado, setTallerSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [reservado, setReservado] = useState(false);
  const [yaReservado, setYaReservado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);

  // Paleta de colores MasterCook Academy
  const colors = {
    primary: '#D94F4F',    // Salsa Tomato
    secondary: '#FFF3E2',  // Creamy Vanilla
    accent: '#6B8E23',     // Olive Green
    textPrimary: '#333333', // Charcoal Gray
    textSecondary: '#666666', // Ash Gray
    background: '#FAFAFA'   // Snow White
  };

  // Cargar talleres
  useEffect(() => {
    setBuscando(true);
    setTimeout(() => {
      const datosEjemplo = [
        {
          id: 1,
          nombre: "Cocina Italiana",
          descripcion: "Aprende las técnicas tradicionales de pasta y salsas",
          categoria: "Internacional",
          fecha: "15/10/2023",
          precio: 120,
          cupos_disponibles: 5,
          cupos_totales: 15,
          imagen: ComidaItaliana
        },
        {
          id: 2,
          nombre: "Repostería Francesa",
          descripcion: "Domina los clásicos de la pastelería francesa",
          categoria: "Repostería",
          fecha: "20/10/2023",
          precio: 150,
          cupos_disponibles: 2,
          cupos_totales: 10,
          imagen: ReposFrancesa
        },
        {
          id: 3,
          nombre: "Cocina Asiática",
          descripcion: "Técnicas auténticas de cocina tailandesa y japonesa",
          categoria: "Internacional",
          fecha: "25/10/2023",
          precio: 135,
          cupos_disponibles: 8,
          cupos_totales: 12,
          imagen: ComidaAsiatica
        }
      ];
      setTalleres(datosEjemplo);
      setBuscando(false);
    }, 800);
  }, []);

  const handleBuscarTalleres = () => {
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
    }, 300);
  };

  const handleSeleccionarTaller = (taller) => {
    setTallerSeleccionado(taller);
    setYaReservado(false);
    setReservado(false);
  };

  const handleReservar = () => {
    if (!tallerSeleccionado) return;
    
    setCargando(true);
    
    setTimeout(() => {
      setReservado(true);
      setTalleres(prev => prev.map(t => 
        t.id === tallerSeleccionado.id 
          ? { ...t, cupos_disponibles: t.cupos_disponibles - 1 } 
          : t
      ));
      setCargando(false);
      setMostrarPago(true);
    }, 1000);
  };

  const talleresFiltrados = talleres.filter(taller =>
    taller.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    taller.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Estilos con la paleta MasterCook Academy
  const styles = {
    mainContainer: {
      minHeight: "100vh",
      backgroundColor: colors.background,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Century Gothic', Arial, sans-serif"
    },
    nav: {
      backgroundColor: colors.primary,
      padding: "15px 0",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      width: "100%"
    },
    navContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    navButton: {
      color: colors.secondary,
      background: "none",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      padding: "10px 20px",
      margin: "0 5px",
      borderRadius: "20px",
      transition: "all 0.3s",
      fontSize: "14px",
      textTransform: "uppercase",
      minWidth: "120px",
      textAlign: "center"
    },
    content: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      width: "100%",
      color: colors.textPrimary
    },
    card: {
      backgroundColor: "#FFF",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "20px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      padding: "15px",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    selectedCard: {
      border: `2px solid ${colors.accent}`,
      backgroundColor: colors.secondary
    },
    image: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "8px",
      marginRight: "15px"
    },
    tallerInfo: {
      flex: 1
    },
    infoText: {
      fontSize: "14px",
      color: colors.textPrimary,
      margin: "4px 0"
    },
    button: {
      backgroundColor: colors.accent,
      color: colors.secondary,
      border: "none",
      borderRadius: "8px",
      padding: "12px 20px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      width: "100%",
      marginTop: "15px",
      transition: "all 0.3s"
    },
    searchInput: {
      width: "100%",
      padding: "12px 15px",
      border: `1px solid ${colors.textSecondary}`,
      borderRadius: "8px",
      fontSize: "14px",
      marginBottom: "15px",
      boxSizing: "border-box",
      color: colors.textPrimary
    },
    searchButton: {
      backgroundColor: colors.primary,
      color: colors.secondary,
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "20px",
      width: "100%"
    },
    successMessage: {
      backgroundColor: "#F0FFF4",
      color: colors.accent,
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      textAlign: "center",
      border: `1px solid ${colors.accent}`
    },
    errorMessage: {
      backgroundColor: "#FFF5F5",
      color: colors.primary,
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      textAlign: "center",
      border: `1px solid ${colors.primary}`
    },
    loadingMessage: {
      textAlign: "center",
      padding: "20px",
      color: colors.textSecondary
    },
    detallesContainer: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#FFF",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      color: colors.textPrimary
    },
    title: {
      color: colors.primary,
      textAlign: "center",
      marginBottom: "20px"
    }
  };

  // Renderizado condicional principal
  if (mostrarPago && tallerSeleccionado) {
    return (
      <Pago 
        taller={tallerSeleccionado} 
        onPagoConfirmado={() => navigate('/verreservas')}
        onVolver={() => setMostrarPago(false)}
      />
    );
  }

  return (
    <div style={styles.mainContainer}>
      {/* Menú de navegación */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <button 
            style={styles.navButton} 
            onClick={() => navigate('/navegar')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.secondary;
            }}
          >
            Talleres
          </button>
          <button 
            style={styles.navButton} 
            onClick={() => navigate('/reservartaller')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.secondary;
            }}
          >
            Reservar
          </button>
          <button 
            style={styles.navButton} 
            onClick={() => navigate('/verreservas')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.secondary;
            }}
          >
            Mis Reservas
          </button>
          <button 
            style={styles.navButton} 
            onClick={() => navigate('/perfil')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.secondary;
            }}
          >
            Perfil
          </button>
          <button 
            style={styles.navButton} 
            onClick={() => navigate('/pago')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.secondary;
            }}
          >
            Pago
          </button>
          <button 
            style={styles.navButton} 
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.secondary;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = colors.secondary;
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div style={styles.content}>
        <h2 style={styles.title}>RESERVAR TALLER</h2>
        
        {!tallerSeleccionado ? (
          <>
            <input
              type="text"
              placeholder="Buscar talleres por nombre o descripción..."
              style={styles.searchInput}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button 
              style={styles.searchButton}
              onClick={handleBuscarTalleres}
              disabled={buscando}
            >
              {buscando ? "Buscando..." : "Buscar Talleres"}
            </button>

            {buscando ? (
              <div style={styles.loadingMessage}>Cargando talleres...</div>
            ) : talleresFiltrados.length > 0 ? (
              talleresFiltrados.map(taller => (
                <div 
                  key={taller.id}
                  style={{
                    ...styles.card,
                    ...(tallerSeleccionado?.id === taller.id && styles.selectedCard)
                  }}
                  onClick={() => handleSeleccionarTaller(taller)}
                >
                  <img src={taller.imagen} alt={taller.nombre} style={styles.image} />
                  <div style={styles.tallerInfo}>
                    <p style={{ ...styles.infoText, fontWeight: "bold" }}>{taller.nombre}</p>
                    <p style={styles.infoText}>Fecha: {taller.fecha}</p>
                    <p style={styles.infoText}>Precio: ${taller.precio}</p>
                    <p style={styles.infoText}>Cupos: {taller.cupos_disponibles}/{taller.cupos_totales}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.errorMessage}>
                No se encontraron talleres que coincidan con tu búsqueda.
              </div>
            )}
          </>
        ) : (
          <div>
            <div style={styles.card}>
              <img src={tallerSeleccionado.imagen} alt={tallerSeleccionado.nombre} style={styles.image} />
              <div style={styles.tallerInfo}>
                <p style={{ ...styles.infoText, fontWeight: "bold", fontSize: "16px" }}>
                  {tallerSeleccionado.nombre}
                </p>
                <p style={styles.infoText}>Categoría: {tallerSeleccionado.categoria}</p>
                <p style={styles.infoText}>Fecha: {tallerSeleccionado.fecha}</p>
                <p style={styles.infoText}>Precio: ${tallerSeleccionado.precio}</p>
                <p style={styles.infoText}>
                  Cupos disponibles: {tallerSeleccionado.cupos_disponibles}/{tallerSeleccionado.cupos_totales}
                </p>
              </div>
            </div>

            <div style={styles.detallesContainer}>
              <h3 style={{ marginTop: 0, color: colors.primary }}>Descripción</h3>
              <p style={styles.infoText}>{tallerSeleccionado.descripcion}</p>

              {reservado ? (
                <>
                  <div style={styles.successMessage}>
                    ¡Reserva confirmada para {tallerSeleccionado.nombre}!
                  </div>
                  <button
                    style={styles.button}
                    onClick={() => navigate('/verreservas')}
                  >
                    Ver mis reservas
                  </button>
                </>
              ) : yaReservado ? (
                <div style={styles.errorMessage}>
                  Ya tienes una reserva para este taller.
                </div>
              ) : tallerSeleccionado.cupos_disponibles <= 0 ? (
                <div style={styles.errorMessage}>
                  No hay cupos disponibles para este taller.
                </div>
              ) : (
                <button
                  style={{
                    ...styles.button,
                    ...(cargando && { backgroundColor: "#CCC", cursor: "not-allowed" })
                  }}
                  onClick={handleReservar}
                  disabled={cargando}
                >
                  {cargando ? "Procesando reserva..." : "Confirmar Reserva"}
                </button>
              )}

              <button
                style={{
                  ...styles.button,
                  backgroundColor: colors.primary,
                  marginTop: "10px"
                }}
                onClick={() => setTallerSeleccionado(null)}
              >
                Volver a la lista
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservarTaller;