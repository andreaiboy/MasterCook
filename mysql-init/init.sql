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

CREATE TABLE IF NOT EXISTS PAGOS (
  id_pago INT AUTO_INCREMENT PRIMARY KEY,
  id_reserva INT UNIQUE,
  monto DECIMAL(10,2),
  fecha_pago TIMESTAMP,
  metodo_pago VARCHAR(20),
  CONSTRAINT fk_pago_reserva 
      FOREIGN KEY (id_reserva) 
      REFERENCES Reservacion(id_reserva)
);


-- Insertar usuarios
INSERT INTO USUARIO (nombre, nombre_usuario, contrasena, correo) VALUES
  ('Julio Robles', 'Jujar2307', 'Jujar2307.', 'jujarobles@gmail.com'),
  ('Diego Urbina', 'Diegol', '12345678', 'diegol@gmail.com'),
  ('Ana Pérez', 'AnitaChef', 'recetas123', 'ana.perez@gmail.com'),
  ('Luis Gómez', 'LuigiMaster', 'panadero88', 'luis.gomez@gmail.com'),
  ('María López', 'Mariamix', 'mixcook45', 'maria.lopez@gmail.com');

-- Insertar categorías
INSERT INTO CATEGORIAS (nombre) VALUES 
  ('Repostería'), ('Panadería'), ('Cocina Internacional');

-- Insertar cursos
INSERT INTO CURSOS (nombre, id_categoria, fecha, precio, cupo, imagen_url, descripcion, instructor, duracion_horas) VALUES
  ('Repostería básica', 1, '2025-06-10', 250.00, 20, '/images/cursos/REPBAS.jpg', 'Curso para principiantes en repostería', 'Chef Sofía', 3),
  ('Pan artesanal', 2, '2025-06-17', 300.00, 15, '/images/cursos/PANART.jpg', 'Elaboración de pan artesanal en casa', 'Chef Mateo', 4),
  ('Cocina italiana', 3, '2025-07-05', 400.00, 10, '/images/cursos/ITA.jpg', 'Pastas y salsas desde cero', 'Chef Giulia', 5),
  ('Pastelería avanzada', 1, '2025-07-12', 450.00, 8, '/images/cursos/PASTADV.jpg', 'Técnicas profesionales de pastelería', 'Chef Pierre', 6),
  ('Pan sin gluten', 2, '2025-07-19', 320.00, 12, '/images/cursos/SINGLU.jpg', 'Recetas de pan apto para celíacos', 'Chef Laura', 4);

-- Insertar estados de reserva
INSERT INTO ESTADOS_RESERVA (nombre) VALUES 
  ('Pendiente'), ('Pagada'), ('Cancelada');

-- Insertar reservaciones
INSERT INTO Reservacion (id_usuario, id_curso, id_estado, pagado, metodo_pago, codigo_confirmacion) VALUES
  (1, 1, 2, TRUE, 'Tarjeta', 'ABC123'),
  (2, 1, 2, FALSE, NULL, 'XYZ789'),
  (3, 2, 2, TRUE, 'Transferencia', 'PQR456'),
  (4, 3, 3, FALSE, NULL, 'LMN321'),
  (5, 4, 2, TRUE, 'Tarjeta', 'JKL999');

-- Insertar pagos
INSERT INTO PAGOS (id_reserva, monto, fecha_pago, metodo_pago) VALUES
  (1, 250.00, '2025-05-20 10:00:00', 'Tarjeta'),
  (3, 300.00, '2025-05-21 15:30:00', 'Transferencia'),
  (5, 450.00, '2025-05-22 08:45:00', 'Tarjeta');
