import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { MovieCard } from '../components/MovieCard';
import apiClient from '../api/apiClient';

export const Inicio = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarCatalogo = async () => {
    try {
      const { data } = await apiClient.get('/media');
      setPeliculas(data);
      setCargando(false);
    } catch (error) {
      console.error("Error API:", error);
      setCargando(false);
    }
  };

  useEffect(() => { cargarCatalogo(); }, []);

  return (
    <div className="main-content-wrapper min-vh-100">
      <Hero />
      <div className="container mt-5 px-4">
        <h3 className="section-title mb-4">
          Catálogo Disponible
        </h3>

        {cargando ? (
          <div className="loading-wrapper">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="mt-3 text-muted">Sincronizando catálogo...</p>
          </div>
        ) : (
          <div className="row g-4">
            {peliculas.length > 0 ? (
              peliculas.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            ) : (
              <div className="empty-state text-center py-5">
                <p>No hay producciones registradas en el sistema.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};