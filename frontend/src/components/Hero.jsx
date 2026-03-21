import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="hero-container text-center">
      <h1 className="hero-title fw-bold display-4 mb-3">
        CIUDA: Banco de Películas IUDigital
      </h1>
      
      <p className="hero-text mx-auto mb-4">
        Panel de control de administrador centralizado para la gestión del catálogo multimedia de la IU Digital de Antioquia. 
        Organiza géneros, directores y producciones en un solo lugar.
      </p>
      
      <Link to="/media" className="btn btn-warning btn-lg fw-bold px-5 rounded-pill shadow">
        Gestionar Inventario
      </Link>
    </div>
  );
};