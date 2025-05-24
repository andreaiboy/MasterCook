import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar Axios

// Componente Factura que se mostrará después del pago exitoso
const Factura = ({ taller, datosPago, numeroFactura, fecha }) => {
  const colors = {
    primary: '#D94F4F',
    secondary: '#FFF3E2',
    accent: '#6B8E23',
    textPrimary: '#333333',
    textSecondary: '#666666',
    background: '#FAFAFA'
  };

  const styles = {
    facturaContainer: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: '20px auto',
      color: colors.textPrimary,
      fontFamily: "'Century Gothic', Arial, sans-serif"
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
      borderBottom: `2px solid ${colors.primary}`,
      paddingBottom: '20px'
    },
    titulo: {
      color: colors.primary,
      fontSize: '28px',
      margin: '0'
    },
    numeroFactura: {
      textAlign: 'right',
      color: colors.textSecondary
    },
    seccion: {
      marginBottom: '25px'
    },
    subtitulo: {
      color: colors.accent,
      borderBottom: `1px solid ${colors.accent}`,
      paddingBottom: '5px',
      marginBottom: '15px'
    },
    datosCliente: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '30px'
    },
    datosItem: {
      marginBottom: '10px'
    },
    datosLabel: {
      fontWeight: 'bold',
      color: colors.textSecondary,
      display: 'block',
      marginBottom: '5px'
    },
    tablaProductos: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '30px'
    },
    tablaHeader: {
      backgroundColor: colors.primary,
      color: 'white',
      textAlign: 'left',
      padding: '12px'
    },
    tablaCelda: {
      borderBottom: `1px solid ${colors.textSecondary}`,
      padding: '12px',
      verticalAlign: 'top'
    },
    totales: {
      textAlign: 'right',
      marginTop: '20px'
    },
    totalLinea: {
      marginBottom: '10px',
      fontSize: '16px'
    },
    totalImporte: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: colors.primary
    },
    footer: {
      marginTop: '40px',
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: '14px',
      borderTop: `1px solid ${colors.textSecondary}`,
      paddingTop: '20px'
    }
  };

  return (
    <div style={styles.facturaContainer}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.titulo}>Factura</h1>
          <div>Fecha: {fecha}</div>
        </div>
        <div style={styles.numeroFactura}>
          <div>Nº {numeroFactura}</div>
        </div>
      </div>

      <div style={styles.seccion}>
        <h3 style={styles.subtitulo}>Datos del Taller</h3>
        <div style={styles.datosCliente}>
          <div style={styles.datosItem}>
            <span style={styles.datosLabel}>Nombre del Taller:</span>
            {taller.nombre}
          </div>
          <div style={styles.datosItem}>
            <span style={styles.datosLabel}>Categoría:</span>
            {taller.categoria}
          </div>
          <div style={styles.datosItem}>
            <span style={styles.datosLabel}>Fecha del Taller:</span>
            {taller.fecha}
          </div>
        </div>
      </div>

      <div style={styles.seccion}>
        <h3 style={styles.subtitulo}>Detalle de la Transacción</h3>
        <table style={styles.tablaProductos}>
          <thead>
            <tr>
              <th style={styles.tablaHeader}>Descripción</th>
              <th style={styles.tablaHeader}>Cantidad</th>
              <th style={styles.tablaHeader}>Precio Unitario</th>
              <th style={styles.tablaHeader}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tablaCelda}>Reserva de taller: {taller.nombre}</td>
              <td style={styles.tablaCelda}>1</td>
              <td style={styles.tablaCelda}>${taller.precio}</td>
              <td style={styles.tablaCelda}>${taller.precio}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.totales}>
        <div style={styles.totalLinea}>
          <strong>Subtotal:</strong> ${taller.precio}
        </div>
        <div style={styles.totalLinea}>
          <strong>Impuestos (0%):</strong> $0.00
        </div>
        <div style={{ ...styles.totalLinea, ...styles.totalImporte }}>
          <strong>Total:</strong> ${taller.precio}
        </div>
      </div>

      <div style={styles.seccion}>
        <h3 style={styles.subtitulo}>Información de Pago</h3>
        <div style={styles.datosCliente}>
          <div style={styles.datosItem}>
            <span style={styles.datosLabel}>Método de Pago:</span>
            Tarjeta de Crédito/Débito
          </div>
          <div style={styles.datosItem}>
            <span style={styles.datosLabel}>Tarjeta Terminada en:</span>
            {datosPago.numeroTarjeta.slice(-4)}
          </div>
          <div style={styles.datosItem}>
            <span style={styles.datosLabel}>Titular de la Tarjeta:</span>
            {datosPago.nombreTitular}
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>Gracias por su reserva. Para cualquier consulta, por favor contacte con nuestro servicio al cliente.</p>
        <p>Este documento es una factura electrónica y tiene la misma validez que una factura física.</p>
      </div>
    </div>
  );
};

// Componente principal Pago
const Pago = ({ taller = {}, onPagoConfirmado, onVolver }) => {
  const navigate = useNavigate();
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [numeroFactura, setNumeroFactura] = useState('');
  const [fechaFactura, setFechaFactura] = useState('');
  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaExpiracion: '',
    cvv: ''
  });

  // Paleta de colores actualizada
  const colors = {
    primary: '#D94F4F',       // Salsa Tomato
    secondary: '#FFF3E2',     // Creamy Vanilla
    accent: '#6B8E23',        // Olive Green
    textPrimary: '#333333',   // Charcoal Gray
    textSecondary: '#666666', // Ash Gray
    background: '#FAFAFA'     // Snow White
  };

  // Objeto seguro con valores por defecto
  const tallerSeguro = {
    nombre: taller?.nombre || 'Taller no especificado',
    fecha: taller?.fecha || '--/--/----',
    precio: taller?.precio || 0,
    categoria: taller?.categoria || 'Sin categoría',
    ...taller
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPago(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generarNumeroFactura = () => {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    setFechaFactura(`${dia}/${mes}/${año}`);
    setNumeroFactura(`FAC-${año}${mes}${dia}-${randomNum}`);
  };

  const handleConfirmarPago = async () => {
    // Validación básica
    if (!datosPago.numeroTarjeta || !datosPago.nombreTitular || 
        !datosPago.fechaExpiracion || !datosPago.cvv) {
      alert('Por favor complete todos los campos de pago');
      return;
    }
    setProcesando(true);
    
    try {
      const response = await axios.post('http://localhost:5000/realizar-pago', {
        id_reserva: taller.id_reserva, // Asegúrate de que `taller` tenga `id_reserva`
        metodo_pago: 'Tarjeta de Crédito/Débito' // Puedes cambiar esto según sea necesario
      });
      if (response.status === 200) {
        setPagoExitoso(true);
        generarNumeroFactura();
        // Redirigir después de mostrar el mensaje de éxito
        setTimeout(() => {
          if (onPagoConfirmado) onPagoConfirmado();
        }, 2000);
      }
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      alert('Error al procesar el pago. Intente nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  // Estilos actualizados con la paleta de colores
  const styles = {
    mainContainer: {
      minHeight: "100vh",
      backgroundColor: "#FAFAFA",
      fontFamily: "'Century Gothic', Arial, sans-serif",
      display: "flex",
      flexDirection: "column"
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
    contentContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 20px"
    },
    card: {
      backgroundColor: colors.secondary,
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '30px',
      width: '100%',
      maxWidth: '500px',
      color: colors.textPrimary
    },
    title: {
      color: colors.primary,
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '24px'
    },
    sectionTitle: {
      color: colors.accent,
      margin: '15px 0 10px',
      fontSize: '18px',
      borderBottom: `1px solid ${colors.accent}`,
      paddingBottom: '5px'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '10px 0',
      fontSize: '16px'
    },
    infoLabel: {
      fontWeight: 'bold',
      color: colors.textSecondary
    },
    infoValue: {
      color: colors.textPrimary
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px 0',
      paddingTop: '10px',
      borderTop: `1px solid ${colors.textSecondary}`,
      fontSize: '18px'
    },
    totalLabel: {
      fontWeight: 'bold',
      color: colors.textPrimary
    },
    totalValue: {
      fontWeight: 'bold',
      color: colors.primary,
      fontSize: '20px'
    },
    paymentForm: {
      margin: '20px 0'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: colors.textSecondary,
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: `1px solid ${colors.textSecondary}`,
      fontSize: '16px',
      backgroundColor: colors.background,
      color: colors.textPrimary
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: colors.accent,
      color: colors.secondary,
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    },
    buttonDisabled: {
      backgroundColor: colors.textSecondary,
      cursor: 'not-allowed'
    },
    backButton: {
      width: '100%',
      padding: '12px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: colors.primary,
      color: colors.secondary,
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '20px'
    },
    successMessage: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
      fontSize: '16px'
    },
    facturaActions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginTop: '20px'
    }
  };

  // Si mostrarFactura es true, mostramos la factura en lugar del componente de pago
  if (mostrarFactura) {
    return (
      <div style={styles.mainContainer}>
        <div style={{ ...styles.contentContainer, alignItems: 'flex-start' }}>
          <Factura 
            taller={tallerSeguro} 
            datosPago={datosPago} 
            numeroFactura={numeroFactura}
            fecha={fechaFactura}
          />
          <div style={styles.facturaActions}>
            <button
              style={{
                ...styles.button,
                backgroundColor: colors.primary,
                maxWidth: '200px'
              }}
              onClick={handleVolverDeFactura}
            >
              Volver a mis reservas
            </button>
            
            <button
              style={{
                ...styles.button,
                backgroundColor: colors.accent,
                maxWidth: '200px'
              }}
              onClick={() => window.print()}
            >
              Imprimir Factura
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      {/* Menú de navegación del componente Perfil */}
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

      {/* Contenido original del componente Pago */}
      <div style={styles.contentContainer}>
        <div style={styles.card}>
          <h2 style={styles.title}>SIMULACIÓN DE PAGO</h2>
          
          {pagoExitoso ? (
            <>
              <div style={styles.successMessage}>
                ¡Pago confirmado exitosamente!<br />
                Tu reserva para "{tallerSeguro.nombre}" ha sido completada.
              </div>
              
              <div style={styles.sectionTitle}>Resumen de la operación:</div>
              
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Taller:</span>
                <span style={styles.infoValue}>{tallerSeguro.nombre}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Fecha:</span>
                <span style={styles.infoValue}>{tallerSeguro.fecha}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Categoría:</span>
                <span style={styles.infoValue}>{tallerSeguro.categoria}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Estado:</span>
                <span style={{ ...styles.infoValue, color: colors.accent }}>Pagado</span>
              </div>
              
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total pagado:</span>
                <span style={styles.totalValue}>${tallerSeguro.precio}</span>
              </div>
              
              <button
                style={styles.backButton}
                onClick={handleVerFactura}
              >
                Ver Factura
              </button>
            </>
          ) : (
            <>
              <div style={styles.sectionTitle}>Resumen de la reserva:</div>
              
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Taller:</span>
                <span style={styles.infoValue}>{tallerSeguro.nombre}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Fecha:</span>
                <span style={styles.infoValue}>{tallerSeguro.fecha}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Categoría:</span>
                <span style={styles.infoValue}>{tallerSeguro.categoria}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Estado:</span>
                <span style={{ ...styles.infoValue, color: colors.primary }}>Pendiente de pago</span>
              </div>
              
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total a pagar:</span>
                <span style={styles.totalValue}>${tallerSeguro.precio}</span>
              </div>
              
              <div style={styles.paymentForm}>
                <h3 style={styles.sectionTitle}>Información de pago</h3>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Número de tarjeta</label>
                  <input
                    type="text"
                    name="numeroTarjeta"
                    value={datosPago.numeroTarjeta}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    style={styles.input}
                    maxLength="19"
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Nombre del titular</label>
                  <input
                    type="text"
                    name="nombreTitular"
                    value={datosPago.nombreTitular}
                    onChange={handleChange}
                    placeholder="Como aparece en la tarjeta"
                    style={styles.input}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.label}>Fecha de expiración</label>
                    <input
                      type="text"
                      name="fechaExpiracion"
                      value={datosPago.fechaExpiracion}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      style={styles.input}
                      maxLength="5"
                    />
                  </div>
                  
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.label}>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={datosPago.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      style={styles.input}
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
              
              <button
                style={{
                  ...styles.button,
                  ...(procesando && styles.buttonDisabled)
                }}
                onClick={handleConfirmarPago}
                disabled={procesando}
              >
                {procesando ? 'Procesando pago...' : 'Confirmar Pago'}
              </button>

              <button
                style={{
                  ...styles.button,
                  backgroundColor: colors.primary,
                  marginTop: '10px'
                }}
                onClick={onVolver}
              >
                Volver al taller
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pago;