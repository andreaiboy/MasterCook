import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_CURSOS_API || "http://localhost:5003";

const Navegar = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/cursos`)
      .then((res) => res.json())
      .then((data) => setCursos(data))
      .catch((err) => console.error("Error al obtener los cursos:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Talleres disponibles</h2>
      <div className="row">
        {cursos.map((curso) => (
          <div key={curso.id_curso} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {curso.imagen_url && (
                <img
                  src={curso.imagen_url}
                  className="card-img-top"
                  alt={curso.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{curso.nombre}</h5>
                <p className="card-text text-muted">{curso.descripcion?.slice(0, 100)}...</p>
                <p className="card-text"><strong>Precio:</strong> ${curso.precio}</p>
                <p className="card-text"><strong>Duración:</strong> {curso.duracion_horas} hrs</p>
                <p className="card-text"><strong>Instructor:</strong> {curso.instructor}</p>
                <div className="mt-auto d-flex justify-content-between">
                  <button className="btn btn-outline-primary btn-sm">Más información</button>
                  <button className="btn btn-success btn-sm">Reservar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navegar;