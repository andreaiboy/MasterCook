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
-- Primero, crea la tabla CATEGORIAS si no existe
CREATE TABLE IF NOT EXISTS CATEGORIAS (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30) UNIQUE NOT NULL
) ENGINE=InnoDB;

-- Luego, crea/modifica la tabla CURSOS
CREATE TABLE IF NOT EXISTS CURSOS (
  id_curso INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  id_categoria INT NOT NULL,  -- Ahora es clave foránea
  fecha DATE NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  cupo INT NOT NULL,
  imagen_url VARCHAR(255),
  descripcion TEXT,  -- Campo añadido para detalles del taller
  instructor VARCHAR(50),  -- Nombre del chef/instructor
  duracion_horas INT,  -- Duración en horas (ej: 2, 4)
  
  -- Clave foránea a CATEGORIAS
  CONSTRAINT fk_curso_categoria 
    FOREIGN KEY (id_categoria) 
    REFERENCES CATEGORIAS(id_categoria)
) ENGINE=InnoDB;

-- 3. Tabla de estados de reserva
CREATE TABLE IF NOT EXISTS ESTADOS_RESERVA (
  id_estado INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(20) UNIQUE -- Ej: "Pendiente", "Confirmada", "Cancelada"
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS Reservacion (
  id_reserva INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_curso INT NOT NULL,
  
  -- Nuevos campos añadidos:
  fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha/hora en que se hizo la reserva
  id_estado INT NOT NULL,                           -- Estado (Pendiente, Confirmada, etc.)
  pagado BOOLEAN DEFAULT FALSE,                     -- ¿Está pagada la reserva?
  metodo_pago VARCHAR(20) DEFAULT NULL,             -- Ej: "Tarjeta", "Transferencia"
  codigo_confirmacion VARCHAR(10) UNIQUE,           -- Código único para el usuario
  
  -- Claves foráneas originales:
  CONSTRAINT fk_reserva_usuario
      FOREIGN KEY (id_usuario)
      REFERENCES USUARIO(id_usuario)
      ON DELETE CASCADE,
      
  CONSTRAINT fk_reserva_curso
      FOREIGN KEY (id_curso)
      REFERENCES CURSOS(id_curso)
      ON DELETE CASCADE,
      
  -- Nueva clave foránea para el estado:
  CONSTRAINT fk_reserva_estado
      FOREIGN KEY (id_estado)
      REFERENCES ESTADOS_RESERVA(id_estado),
      
  -- Restricción única (evita reservas duplicadas):
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

INSERT INTO CATEGORIAS (nombre) VALUES 
  ('Repostería'), ('Panadería'), ('Cocina Internacional');

INSERT INTO ESTADOS_RESERVA (nombre) VALUES 
  ('Pendiente'), ('Confirmada'), ('Cancelada'), ('Completada');