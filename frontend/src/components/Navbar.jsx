import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* El logo y título que llevan al inicio */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/Logo_Cine.png" alt="Logo Cine" />
          <span>CineAdmin</span>
        </Link>
        
        {/* El botón de las 3 rayitas para cuando se vea en celular */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Los 5 módulos requeridos */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/generos">Géneros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/directores">Directores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productoras">Productoras</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tipos">Tipos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/media">Películas</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};