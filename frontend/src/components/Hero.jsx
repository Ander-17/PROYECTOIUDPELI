import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Hero = ({ busqueda, setBusqueda }) => {
  const { esAutenticado } = useAuth();

  return (
    <div className="hero-container text-center py-5 position-relative overflow-hidden">
      <div className="hero-overlay"></div>
      <div className="container position-relative z-2 py-4">
        
        {esAutenticado ? (
          <>
            <h1 className="hero-title fw-bold display-4 mb-3 text-warning">
              Panel de Administración
            </h1>
            <p className="hero-text col-lg-8 mx-auto mb-4 text-light opacity-75">
              Gestión centralizada del catálogo multimedia de la IU Digital de Antioquia.
            </p>
            <Link to="/media" className="btn btn-warning btn-lg fw-bold px-5 rounded-pill shadow">
              🎬 Gestionar Inventario
            </Link>
          </>
        ) : (
          <>
            <h1 className="hero-title fw-bold display-3 mb-3 text-white">
              CIUDA <span className="text-warning">PELÍCULAS</span>
            </h1>
            <p className="hero-text col-lg-7 mx-auto mb-4 text-light opacity-75 fs-5">
              Explora producciones, documentales y contenidos académicos de la IU Digital de Antioquia.
            </p>

            {/* Buscador Estilo Cuevana Hero */}
            <div className="row justify-content-center my-4">
              <div className="col-md-7 col-lg-6">
                <div className="input-group shadow-lg rounded-pill overflow-hidden bg-dark border border-secondary border-opacity-50">
                  <span className="input-group-text bg-transparent border-0 text-muted ps-4">
                    🔍
                  </span>
                  <input
                    type="text"
                    className="form-control bg-transparent text-white border-0 py-3 shadow-none fs-5"
                    placeholder="Buscar películas, series o documentales..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  {busqueda && (
                    <button 
                      className="btn bg-transparent border-0 text-muted pe-3" 
                      onClick={() => setBusqueda('')}
                    >
                      ✖
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};