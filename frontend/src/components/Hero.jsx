import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="hero-section text-center">
      <h1 className="hero-title display-4 mb-3">
        🎬 Bienvenido a CineAdmin
      </h1>
      <p className="hero-subtitle mb-4">
        Tu panel de control centralizado para gestionar el catálogo multimedia. Administra géneros, directores, productoras y todo tu inventario de películas y series en un solo lugar.
      </p>
      
      {/* Botón de llamada a la acción */}
      <Link to="/media" className="btn btn-warning btn-lg fw-bold px-4 rounded-pill shadow-sm">
        Explorar Catálogo Multimedia
      </Link>
    </div>
  );
};