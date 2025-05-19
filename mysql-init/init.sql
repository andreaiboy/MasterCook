CREATE DATABASE IF NOT EXISTS mastercook_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE mastercook_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS USUARIO (
  id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(50),
  nombre_usuario  VARCHAR(20) UNIQUE,
  contrasena      VARCHAR(100),  -- espacio por si usas hash
  correo          VARCHAR(80) UNIQUE
) ENGINE=InnoDB;

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS CURSOS (
  id_curso    INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(50),
  categoria   VARCHAR(30),
  fecha       DATE,
  precio      DECIMAL(10,2),
  cupo        INT,
  imagen_url  VARCHAR(255)
) ENGINE=InnoDB;

-- Tabla de reservaciones
CREATE TABLE IF NOT EXISTS Reservacion (
  id_reserva INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_curso   INT NOT NULL,
  CONSTRAINT fk_reserva_usuario
      FOREIGN KEY (id_usuario)
      REFERENCES USUARIO(id_usuario)
      ON DELETE CASCADE,
  CONSTRAINT fk_reserva_curso
      FOREIGN KEY (id_curso)
      REFERENCES CURSOS(id_curso)
      ON DELETE CASCADE,
  UNIQUE KEY uk_usuario_curso (id_usuario, id_curso)
) ENGINE=InnoDB;

-- Insertar usuarios
INSERT INTO USUARIO (nombre, nombre_usuario, contrasena, correo) VALUES
  ('Julio Robles', 'Jujar2307', 'Jujar2307.', 'jujarobles@gmal.com'),
  ('Diego Urbina', 'Diegol', '12345678', 'diegol@gmail.com');

-- Insertar cursos
INSERT INTO CURSOS (nombre, categoria, fecha, precio, cupo, imagen_url) VALUES
  ('Repostería básica', 'Reposteria', '2025-06-10', 250.00, 20, '/images/cursos/REPBAS.jpg'),
  ('Pan artesanal', 'Panaderia', '2025-06-17', 300.00, 15, '/images/cursos/PANART.jpg');

-- Insertar reservaciones
INSERT INTO Reservacion (id_usuario, id_curso) VALUES
  (1, 1),
  (2, 1);
