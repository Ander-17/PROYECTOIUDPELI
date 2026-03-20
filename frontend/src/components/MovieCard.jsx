import React from 'react';

// Recibimos el objeto "pelicula" como parámetro (prop)
export const MovieCard = ({ pelicula }) => {
  
  // Si por alguna razón no nos pasan la película, ponemos datos por defecto para que no se dañe la página
  const titulo = pelicula?.titulo || 'Título Desconocido';
  const sinopsis = pelicula?.sinopsis || 'Sin descripción disponible.';
  const imagen = pelicula?.imagenPortada || 'https://via.placeholder.com/300x450?text=Sin+Poster';
  const estreno = pelicula?.añoEstreno || 'N/A';

  return (
    <div className="card movie-card h-100 shadow-sm bg-dark text-light">
      <img 
        src={imagen} 
        className="card-img-top movie-poster" 
        alt={`Póster de ${titulo}`} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-warning">{titulo}</h5>
        <p className="text-muted small mb-2">Año: {estreno}</p>
        <p className="card-text small text-truncate-2">{sinopsis}</p>
        
        {/* El mt-auto empuja el botón siempre hacia abajo para que todas las tarjetas queden alineadas */}
        <div className="mt-auto pt-3">
          <button className="btn btn-outline-warning w-100 btn-sm fw-bold">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};