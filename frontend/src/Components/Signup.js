import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagenLateral from "./Logo.png";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "Campo requerido";
    if (!formData.email.includes("@")) newErrors.email = "Email inválido";
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "No coincide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Formulario enviado");
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  // Estilos con la paleta de colores proporcionada
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#FAFAFA", // Fondo Claro: Snow White
      fontFamily: "'Century Gothic', Arial, sans-serif",
      padding: "20px",
    },
    card: {
      display: "flex",
      backgroundColor: "#FFF3E2", // Secundario: Creamy Vanilla
      borderRadius: "20px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      width: "100%",
      maxWidth: "900px",
      border: "2px solid #6B8E23", // Acento: Olive Green
    },
    imageSection: {
      flex: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      backgroundColor: "#FFF3E2", // Secundario: Creamy Vanilla
    },
    image: {
      width: "100%",
      maxWidth: "300px",
      height: "auto",
    },
    formSection: {
      flex: "1",
      padding: "40px",
      backgroundColor: "white",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "25px",
      color: "#D94F4F", // Primario: Salsa Tomato
      textAlign: "center",
      textTransform: "uppercase",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#333333", // Texto Principal: Charcoal Gray
      fontWeight: "600",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1px solid #6B8E23", // Acento: Olive Green
      fontSize: "16px",
      marginBottom: "5px",
      boxSizing: "border-box",
      backgroundColor: "#FAFAFA", // Fondo Claro: Snow White
      color: "#333333", // Texto Principal
      transition: "all 0.3s",
      fontFamily: "'Century Gothic', Arial, sans-serif",
    },
    inputError: {
      border: "2px solid #D94F4F", // Primario: Salsa Tomato
    },
    inputFocus: {
      border: "2px solid #6B8E23", // Acento: Olive Green
      outline: "none",
      boxShadow: "0 0 0 2px rgba(107, 142, 35, 0.2)",
    },
    errorText: {
      color: "#D94F4F", // Primario: Salsa Tomato
      fontSize: "13px",
      marginBottom: "15px",
      fontWeight: "500",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#D94F4F", // Primario: Salsa Tomato
      color: "#FFF3E2", // Secundario: Creamy Vanilla
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "15px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: "all 0.3s",
    },
    buttonHover: {
      backgroundColor: "#C04545", // Variante más oscura del primario
    },
    loginLink: {
      marginTop: "20px",
      textAlign: "center",
      color: "#666666", // Texto Secundario: Ash Gray
      cursor: "pointer",
      fontSize: "14px",
      transition: "color 0.3s",
    },
    loginLinkSpan: {
      fontWeight: "bold",
      color: "#6B8E23", // Acento: Olive Green
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.imageSection}>
          <img src={imagenLateral} alt="Decoración" style={styles.image} />
        </div>
        
        <form style={styles.formSection} onSubmit={handleSubmit}>
          <h1 style={styles.title}>Registro</h1>

          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onFocus={() => setFocusedField("nombre")}
              onBlur={() => setFocusedField("")}
              style={{
                ...styles.input,
                ...(errors.nombre && styles.inputError),
                ...(focusedField === "nombre" && styles.inputFocus),
              }}
              placeholder="Ej: Juan Pérez"
            />
            {errors.nombre && <div style={styles.errorText}>{errors.nombre}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              style={{
                ...styles.input,
                ...(errors.email && styles.inputError),
                ...(focusedField === "email" && styles.inputFocus),
              }}
              placeholder="Ej: usuario@email.com"
            />
            {errors.email && <div style={styles.errorText}>{errors.email}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              style={{
                ...styles.input,
                ...(errors.password && styles.inputError),
                ...(focusedField === "password" && styles.inputFocus),
              }}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <div style={styles.errorText}>{errors.password}</div>}
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={styles.label}>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField("")}
              style={{
                ...styles.input,
                ...(errors.confirmPassword && styles.inputError),
                ...(focusedField === "confirmPassword" && styles.inputFocus),
              }}
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword && (
              <div style={styles.errorText}>{errors.confirmPassword}</div>
            )}
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Registrar
          </button>

          <p 
            style={styles.loginLink} 
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.target.style.color = "#333333"}
            onMouseLeave={(e) => e.target.style.color = styles.loginLink.color}
          >
            ¿Ya tienes cuenta? <span style={styles.loginLinkSpan}>Inicia Sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Formulario;