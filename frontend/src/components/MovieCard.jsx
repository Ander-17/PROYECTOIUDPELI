import React from 'react';

export const MovieCard = ({ movie }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card movie-card h-100 shadow-lg">
        
        {/* Imagen del Contenido */}
        <div className="movie-card-img-container">
          <img 
            src={movie.imagen} 
            className="card-img-top movie-card-img" 
            alt={movie.titulo}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Sin+Imagen';
            }}
          />
          <span className="badge bg-warning text-dark movie-card-badge">
            {movie.generoPrincipal?.nombre}
          </span>
        </div>

        {/* Detalles de la Producción */}
        <div className="card-body movie-card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="movie-card-title">{movie.titulo}</h5>
            <p className="movie-card-subtitle">
              {movie.anioEstreno} • {movie.tipo?.nombre}
            </p>
            <p className="movie-card-text">
              {movie.sinopsis || "Sin sinopsis disponible."}
            </p>
          </div>

          <a 
            href={movie.url} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-warning btn-sm fw-bold w-100 movie-card-btn"
          >
            ▶ Ver ahora
          </a>
        </div>
      </div>
    </div>
  );
};