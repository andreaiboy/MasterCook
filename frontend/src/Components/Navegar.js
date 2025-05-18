import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ComidaItaliana from './ComidaItaliana.jpg';
import ReposFrancesa from './ReposFrancesa.jpg';
import ComidaAsiatica from './ComidaAsiatica.jpg';

const Navegar = () => {
  const navigate = useNavigate();
  const [talleres, setTalleres] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [cargando, setCargando] = useState(true);
  const [tallerExpandido, setTallerExpandido] = useState(null);

  useEffect(() => {
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
      setCategorias([...new Set(datosEjemplo.map(t => t.categoria))]);
      setCargando(false);
    }, 1000);
  }, []);

  const talleresFiltrados = filtro
    ? talleres.filter(taller => taller.categoria === filtro)
    : talleres;

  const handleToggleInfo = (id) => {
    setTallerExpandido(tallerExpandido === id ? null : id);
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
      maxWidth: "1000px",
      margin: "0 auto",
      flex: 1
    },
    card: {
      backgroundColor: "#FFF",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "20px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      padding: "15px"
    },
    image: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "10px",
      marginRight: "15px"
    },
    tallerInfo: {
      flex: 1
    },
    infoText: {
      fontSize: "14px",
      color: "#333",
      margin: "4px 0"
    },
    infoButton: {
      backgroundColor: "#6B8E23",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "6px 12px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px"
    },
    descripcion: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#444"
    },
    select: {
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      marginBottom: "20px",
      fontSize: "14px",
      width: "100%",
      maxWidth: "300px"
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* Menú de navegación actualizado */}
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
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={styles.select}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria, idx) => (
            <option key={idx} value={categoria}>{categoria}</option>
          ))}
        </select>

        {cargando ? (
          <p>Cargando talleres...</p>
        ) : (
          talleresFiltrados.map((taller) => (
            <div key={taller.id} style={styles.card}>
              <img src={taller.imagen} alt={taller.nombre} style={styles.image} />
              <div style={styles.tallerInfo}>
                <p style={styles.infoText}><strong>{taller.nombre}</strong></p>
                <p style={styles.infoText}>Categoría: {taller.categoria}</p>
                <p style={styles.infoText}>Fecha: {taller.fecha}</p>
                <p style={styles.infoText}>Precio: ${taller.precio}</p>
                <p style={styles.infoText}>Cupos: {taller.cupos_disponibles}/{taller.cupos_totales}</p>

                <button
                  style={styles.infoButton}
                  onClick={() => handleToggleInfo(taller.id)}
                >
                  {tallerExpandido === taller.id ? 'Ocultar' : '+ Info'}
                </button>

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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Navegar;