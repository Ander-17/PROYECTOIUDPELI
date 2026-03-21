import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span>🎬 CIUDA</span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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