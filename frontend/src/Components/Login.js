import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupError, setPopupError] = useState(false);

  const showMessage = (message, isError = false) => {
    setPopupMessage(message);
    setPopupError(isError);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (!isError) navigate("/navegar");  
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const AUTH_API_URL = process.env.REACT_APP_AUTH_API || 'http://localhost:5001';
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage(data.message);
      } else {
        showMessage(data.message || "Credenciales incorrectas", true);
      }
    } catch (error) {
      showMessage("Error al conectar con el servidor.", true);
    }
  };

  return (
    <>
      <GlobalStyle />
      {showPopup && <Popup $error={popupError}>{popupMessage}</Popup>}
      
      <AppBackground>
        <LoginCard>
          <LogoContainer>
            <Logo src="/Logo.png" alt="MasterCook Academy Logo" />
            <BrandName>MASTERCOOK ACADEMY</BrandName>
          </LogoContainer>
          
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label>Correo:</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Contraseña:</Label>
              <PasswordWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <ToggleButton 
                  type="button" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </ToggleButton>
              </PasswordWrapper>
            </FormGroup>

            <SubmitButton type="submit">
              INICIAR SESIÓN
            </SubmitButton>
          </Form>

          {message && <Message>{message}</Message>}

          <SignupLink onClick={() => navigate("/signup")}>
            ¿No tienes cuenta? Regístrate
          </SignupLink>
        </LoginCard>
      </AppBackground>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Century Gothic', Arial, sans-serif;
    overflow-x: hidden;
  }
`;

const AppBackground = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: 
    background: 
    linear-gradient(rgba(255, 243, 226, 0.85), rgba(255, 243, 226, 0.85)),
    url('/FondoCook.png') center/cover no-repeat fixed;
  
  /* Efecto de desenfoque para la imagen de fondo */
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(3px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 15px;
    background-attachment: scroll;
  }
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    padding: 1.8rem;
    max-width: 95%;
    backdrop-filter: none;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    width: 100px;
  }
`;

const BrandName = styled.h1`
  color: #D94F4F;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  text-transform: uppercase;
  font-family: 'Century Gothic', sans-serif;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  margin-left: 5px;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #6B8E23;
  border-radius: 10px;
  width: 100%;
  font-family: inherit;
  font-size: 0.95rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #D94F4F;
    box-shadow: 0 0 0 2px rgba(214, 79, 79, 0.2);
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6B8E23;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(107, 142, 35, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  background-color: #D94F4F;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(214, 79, 79, 0.2);

  &:hover {
    background-color: #C04545;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(214, 79, 79, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Message = styled.div`
  margin-top: 1.2rem;
  color: #D94F4F;
  font-size: 0.95rem;
  font-weight: 600;
`;

const SignupLink = styled.span`
  display: inline-block;
  margin-top: 1.5rem;
  color: #666;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    color: #D94F4F;
    text-decoration: underline;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ $error }) => ($error ? "#f44336" : "#4CAF50")};
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-weight: 600;
  font-size: 0.95rem;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; top: 10px; }
    to { opacity: 1; top: 20px; }
  }
`;

export default Login;