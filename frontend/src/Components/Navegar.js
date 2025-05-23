import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navegar = () => {
  const navigate = useNavigate();
  const [talleres, setTalleres] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroOrden, setFiltroOrden] = useState("");
  const [cargando, setCargando] = useState(true);
  const [tallerExpandido, setTallerExpandido] = useState(null);

  useEffect(() => {
    // URL del backend (puedes usar variable de entorno si quieres)
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5004";

    fetch(`${API_URL}/api/cursos`)
      .then((res) => res.json())
      .then((data) => {
        setTalleres(data);
        // Extraer categorías únicas del backend
        setCategorias([...new Set(data.map((t) => t.categoria))]);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar cursos:", error);
        setCargando(false);
      });
  }, []);

  const talleresFiltrados = filtroCategoria
    ? talleres.filter((taller) => taller.categoria === filtroCategoria)
    : talleres;

  const ordenarTalleres = (talleres) => {
    const talleresOrdenados = [...talleres];

    switch (filtroOrden) {
      case "az":
        return talleresOrdenados.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      case "za":
        return talleresOrdenados.sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        );
      case "precio-asc":
        return talleresOrdenados.sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return talleresOrdenados.sort((a, b) => b.precio - a.precio);
      default:
        return talleresOrdenados;
    }
  };

  const talleresOrdenados = ordenarTalleres(talleresFiltrados);

  const handleToggleInfo = (id) => {
    setTallerExpandido(tallerExpandido === id ? null : id);
  };

  const handleReservar = (tallerId) => {
    navigate(`/reservartaller/${tallerId}`);
  };

  const styles = {
    mainContainer: {
      minHeight: "100vh",
      backgroundColor: "#FAFAFA",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Century Gothic', Arial, sans-serif"
    },
    nav: {
      backgroundColor: "#D94F4F",
      padding: "15px 0",
      display: "flex",
      justifyContent: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    },
    navButton: {
      color: "#FFF3E2",
      background: "none",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      padding: "8px 20px",
      margin: "0 10px",
      borderRadius: "20px",
      transition: "all 0.3s",
      fontSize: "14px",
      textTransform: "uppercase"
    },
    content: {
      padding: "20px",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      flex: 1
    },
    filtersContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    select: {
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "14px",
      width: "100%",
      maxWidth: "300px",
      backgroundColor: "#FFF",
      cursor: "pointer"
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "10px"
    },
    card: {
      backgroundColor: "#FFF",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "15px",
      height: "auto",
      minHeight: "300px",
      transition: "transform 0.3s",
      ':hover': {
        transform: "translateY(-5px)"
      }
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px"
    },
    tallerInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    infoText: {
      fontSize: "14px",
      color: "#333",
      margin: "4px 0"
    },
    buttonsContainer: {
      display: "flex",
      gap: "10px",
      marginTop: "10px"
    },
    infoButton: {
      backgroundColor: "#6B8E23",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
      flex: 1,
      transition: "all 0.3s",
      ':hover': {
        backgroundColor: "#5a7a1d"
      }
    },
    reservaButton: {
      backgroundColor: "#D94F4F",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
      flex: 1,
      transition: "all 0.3s",
      ':hover': {
        backgroundColor: "#c03e3e"
      }
    },
    descripcion: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#444",
      padding: "5px 0"
    },
    loading: {
      textAlign: "center",
      padding: "20px",
      color: "#555"
    }
  };

  return (
    <div style={styles.mainContainer}>
      <nav style={styles.nav}>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/navegar')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FFF3E2";
            e.target.style.color = "#D94F4F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FFF3E2";
          }}
        >
          Talleres
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/reservartaller')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FFF3E2";
            e.target.style.color = "#D94F4F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FFF3E2";
          }}
        >
          Reservar
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/verreservas')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FFF3E2";
            e.target.style.color = "#D94F4F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FFF3E2";
          }}
        >
          Mis Reservas
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/perfil')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FFF3E2";
            e.target.style.color = "#D94F4F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FFF3E2";
          }}
        >
          Perfil
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/pago')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FFF3E2";
            e.target.style.color = "#D94F4F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FFF3E2";
          }}
        >
          Pago
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FFF3E2";
            e.target.style.color = "#D94F4F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#FFF3E2";
          }}
        >
          Cerrar Sesión
        </button>
      </nav>

      <div style={styles.content}>
        <div style={styles.filtersContainer}>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            style={styles.select}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria, idx) => (
              <option key={idx} value={categoria}>{categoria}</option>
            ))}
          </select>

          <select
            value={filtroOrden}
            onChange={(e) => setFiltroOrden(e.target.value)}
            style={styles.select}
          >
            <option value="">Orden por defecto</option>
            <option value="az">Ordenar A-Z</option>
            <option value="za">Ordenar Z-A</option>
            <option value="precio-asc">Precio: Bajo a Alto</option>
            <option value="precio-desc">Precio: Alto a Bajo</option>
          </select>
        </div>

        {cargando ? (
          <p style={styles.loading}>Cargando talleres...</p>
        ) : (
          <div style={styles.gridContainer}>
            {talleresOrdenados.map((taller) => (
              <motion.div 
                key={taller.id} 
                style={styles.card}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={taller.imagen_url} alt={taller.nombre} style={styles.image} />
                <div style={styles.tallerInfo}>
                  <p style={styles.infoText}><strong>{taller.nombre}</strong></p>
                  <p style={styles.infoText}>Categoría: {taller.categoria}</p>
                  <p style={styles.infoText}>Fecha: {taller.fecha}</p>
                  <p style={styles.infoText}>Precio: ${taller.precio}</p>
                  <p style={styles.infoText}>Cupos: {taller.cupos_disponibles}/{taller.cupos_totales}</p>

                  <div style={styles.buttonsContainer}>
                    <button
                      style={styles.infoButton}
                      onClick={() => handleToggleInfo(taller.id)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#5a7a1d"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#6B8E23"}
                    >
                      {tallerExpandido === taller.id ? 'Ocultar' : '+ Info'}
                    </button>
                    <button
                      style={styles.reservaButton}
                      onClick={() => navigate('/reservartaller')}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#c03e3e"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#D94F4F"}
                    >
                      Buscar
                    </button>
                  </div>

                  <AnimatePresence>
                    {tallerExpandido === taller.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p style={styles.descripcion}>{taller.descripcion}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navegar;