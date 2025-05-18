import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  // Estilos con la nueva paleta de colores
  const styles = {
    body: {
      backgroundColor: "#FAFAFA", // Fondo Claro: Snow White
      margin: 0,
      padding: 0,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Century Gothic', Arial, sans-serif",
    },
    container: {
      width: "350px",
      padding: "40px",
      border: "2px solid #6B8E23", // Acento: Olive Green
      borderRadius: "20px",
      textAlign: "center",
      backgroundColor: "#FFF3E2", // Secundario: Creamy Vanilla
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      width: "150px",
      marginBottom: "20px",
    },
    title: {
      color: "#D94F4F", // Primario: Salsa Tomato
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    formGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#333333", // Texto Principal: Charcoal Gray
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #6B8E23", // Acento: Olive Green
      borderRadius: "8px",
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA", // Fondo Claro: Snow White
      color: "#333333", // Texto Principal
      fontFamily: "'Century Gothic', Arial, sans-serif",
    },
    passwordContainer: {
      position: "relative",
    },
    passwordInput: {
      paddingRight: "70px",
    },
    toggle: {
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#6B8E23", // Acento: Olive Green
      fontSize: "0.8rem",
      background: "none",
      border: "none",
      padding: "2px 5px",
      fontWeight: "bold",
    },
    button: {
      marginTop: "20px",
      padding: "12px",
      border: "none",
      backgroundColor: "#D94F4F", // Primario: Salsa Tomato
      color: "#FFF3E2", // Secundario: Creamy Vanilla
      borderRadius: "8px",
      cursor: "pointer",
      width: "100%",
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#C04545", // Variante más oscura del primario
    },
    link: {
      marginTop: "15px",
      display: "block",
      cursor: "pointer",
      color: "#666666", // Texto Secundario: Ash Gray
      fontSize: "14px",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#D94F4F", // Primario: Salsa Tomato
      textDecoration: "underline",
    },
    message: {
      marginTop: "15px",
      textAlign: "center",
      color: "#D94F4F", // Primario: Salsa Tomato
      fontSize: "14px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>INICIAR SESIÓN</h2>

        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Correo:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña:</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, ...styles.passwordInput }}
                placeholder="Ingresa tu contraseña"
                required
              />
              <button 
                type="button"
                style={styles.toggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Iniciar Sesión
          </button>
        </form>

        {message && <div style={styles.message}>{message}</div>}

        <a 
          onClick={() => navigate("/signup")} 
          style={styles.link}
          onMouseEnter={(e) => {
            e.target.style.color = styles.linkHover.color;
            e.target.style.textDecoration = styles.linkHover.textDecoration;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = styles.link.color;
            e.target.style.textDecoration = "none";
          }}
        >
          ¿No tienes cuenta? Regístrate
        </a>

        <div style={{ marginTop: "25px", borderTop: "1px solid #6B8E23", paddingTop: "15px" }}>
          <a 
            onClick={() => navigate("/reservartaller")} 
            style={{ ...styles.link, display: "inline-block", margin: "0 10px" }}
            onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            taller
          </a>
          <a 
            onClick={() => navigate("/verreservas")} 
            style={{ ...styles.link, display: "inline-block", margin: "0 10px" }}
            onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            Reservas
          </a>
          <a 
            onClick={() => navigate("/perfil")} 
            style={{ ...styles.link, display: "inline-block", margin: "0 10px" }}
            onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            perfil
          </a>
          <a 
            onClick={() => navigate("/navegar")} 
            style={{ ...styles.link, display: "inline-block", margin: "0 10px" }}
            onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            navegar
          </a> 
          <a 
            onClick={() => navigate("/pago")} 
            style={{ ...styles.link, display: "inline-block", margin: "0 10px" }}
            onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            pago
          </a> 
        </div>
      </div>
    </div>
  );
}

export default Login;