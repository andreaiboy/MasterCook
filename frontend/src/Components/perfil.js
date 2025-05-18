import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "Andrea Giboy",
    correo: "andreagiboy@gmail.com",
    taller: "Cocina Italiana Avanzada"
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí podrías agregar lógica para guardar los datos
    alert("Datos guardados correctamente");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Estilos con la paleta de colores proporcionada
  const styles = {
    mainContainer: {
      minHeight: "100vh",
      backgroundColor: "#FAFAFA", // Fondo Claro: Snow White
      fontFamily: "'Century Gothic', Arial, sans-serif",
      display: "flex",
      flexDirection: "column"
    },
    nav: {
      backgroundColor: "#D94F4F", // Primario: Salsa Tomato
      padding: "15px 0",
      display: "flex",
      justifyContent: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    },
    navButton: {
      color: "#FFF3E2", // Secundario: Creamy Vanilla
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
    contentContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 20px"
    },
    profileCard: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "30px",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      border: "2px solid #6B8E23" // Acento: Olive Green
    },
    title: {
      color: "#D94F4F", // Primario: Salsa Tomato
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "28px",
      fontWeight: "bold",
      textTransform: "uppercase"
    },
    fieldContainer: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#333333", // Texto Principal: Charcoal Gray
      fontWeight: "600",
      fontSize: "16px"
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      border: `1px solid ${isEditing ? "#6B8E23" : "#DDD"}`, // Acento: Olive Green cuando edita
      borderRadius: "8px",
      backgroundColor: isEditing ? "#FAFAFA" : "#FFF", // Fondo Claro: Snow White
      color: "#333333", // Texto Principal
      fontSize: "16px",
      transition: "all 0.3s",
      pointerEvents: isEditing ? "auto" : "none"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px"
    },
    button: {
      padding: "12px 25px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s",
      textTransform: "uppercase"
    },
    editButton: {
      backgroundColor: "#6B8E23", // Acento: Olive Green
      color: "white"
    },
    saveButton: {
      backgroundColor: "#D94F4F", // Primario: Salsa Tomato
      color: "#FFF3E2" // Secundario: Creamy Vanilla
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* Menú de navegación */}
      <nav style={styles.nav}>
        <button 
          style={styles.navButton}
          onClick={() => handleNavigation('/navegar')}
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
          onClick={() => handleNavigation('/reservartaller')}
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
          onClick={() => handleNavigation('/verreservas')}
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
          onClick={() => handleNavigation('/perfil')}
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

      {/* Contenido del perfil */}
      <div style={styles.contentContainer}>
        <div style={styles.profileCard}>
          <h1 style={styles.title}>Perfil</h1>
          
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Correo:</label>
            <input
              type="email"
              name="correo"
              value={userData.correo}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Taller:</label>
            <input
              type="text"
              name="taller"
              value={userData.taller}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.buttonContainer}>
            {!isEditing ? (
              <button
                style={{ ...styles.button, ...styles.editButton }}
                onClick={handleEdit}
                onMouseEnter={(e) => e.target.style.transform = styles.buttonHover.transform}
                onMouseLeave={(e) => e.target.style.transform = "none"}
              >
                Editar
              </button>
            ) : (
              <button
                style={{ ...styles.button, ...styles.saveButton }}
                onClick={handleSave}
                onMouseEnter={(e) => e.target.style.transform = styles.buttonHover.transform}
                onMouseLeave={(e) => e.target.style.transform = "none"}
              >
                Guardar Datos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;