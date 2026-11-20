import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { MovieCard } from '../components/MovieCard';
import apiClient from '../api/apiClient';

export const Inicio = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  
  // Capturar parámetros de la URL enviados desde el Navbar
  const [searchParams] = useSearchParams();
  const generoUrl = searchParams.get('genero') || '';
  const tipoUrl = searchParams.get('tipo') || '';
  const directorUrl = searchParams.get('director') || '';
  const productoraUrl = searchParams.get('productora') || '';

  const [generoSeleccionado, setGeneroSeleccionado] = useState(generoUrl);

  useEffect(() => {
    setGeneroSeleccionado(generoUrl);
  }, [generoUrl]);

  const cargarCatalogo = async () => {
    try {
      const { data } = await apiClient.get('/media');
      setPeliculas(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar el catálogo:", error);
      setCargando(false);
    }
  };

  useEffect(() => { cargarCatalogo(); }, []);

  const generosUnicos = [...new Set(peliculas.map(p => p.generoPrincipal?.nombre || p.generoPrincipal?.nombres).filter(Boolean))];

  const peliculasFiltradas = peliculas.filter((movie) => {
    const coincideTitulo = movie.titulo?.toLowerCase().includes(busqueda.toLowerCase());

    const generoPeli = movie.generoPrincipal?.nombre || movie.generoPrincipal?.nombres || '';
    const coincideGenero = !generoSeleccionado || generoPeli.toLowerCase() === generoSeleccionado.toLowerCase();

    const tipoPeli = movie.tipo?.nombre || movie.tipo?.nombres || '';
    const coincideTipo = !tipoUrl || tipoPeli.toLowerCase() === tipoUrl.toLowerCase();

    const dirObj = movie.directorPrincipal || movie.director;
    const directorPeli = typeof dirObj === 'object'
      ? (dirObj?.nombres || dirObj?.nombre || '')
      : (dirObj || '');
    const coincideDirector = !directorUrl || directorPeli.toLowerCase().trim() === directorUrl.toLowerCase().trim();

    const prodObj = movie.productora;
    const productoraPeli = typeof prodObj === 'object'
      ? (prodObj?.nombre || prodObj?.nombres || '')
      : (prodObj || '');
    const coincideProductora = !productoraUrl || productoraPeli.toLowerCase().trim() === productoraUrl.toLowerCase().trim();

    return coincideTitulo && coincideGenero && coincideTipo && coincideDirector && coincideProductora;
  });


  const peliculasRecientes = [...peliculasFiltradas].reverse().slice(0, 3);

  return (
    <div className="main-content-wrapper min-vh-100 bg-dark text-white">
      <Hero busqueda={busqueda} setBusqueda={setBusqueda} />

      <div className="container my-5 px-4" id="catalogo">
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 border-bottom border-secondary border-opacity-25 pb-3">
          <h3 className="section-title m-0 fw-bold border-start border-4 border-warning ps-3">
            Catálogo Disponible 
            {generoUrl && <span className="text-warning fs-5"> • Género: {generoUrl}</span>}
            {tipoUrl && <span className="text-warning fs-5"> • Tipo: {tipoUrl}</span>}
            {directorUrl && <span className="text-warning fs-5"> • Director: {directorUrl}</span>}
            {productoraUrl && <span className="text-warning fs-5"> • Productora: {productoraUrl}</span>}
          </h3>

          {!cargando && generosUnicos.length > 0 && (
            <div className="d-flex flex-wrap gap-2">
              <button
                className={`btn btn-sm rounded-pill px-3 ${generoSeleccionado === '' ? 'btn-warning fw-bold' : 'btn-outline-secondary text-white'}`}
                onClick={() => setGeneroSeleccionado('')}
              >
                Todos
              </button>
              {generosUnicos.map((genero, idx) => (
                <button
                  key={idx}
                  className={`btn btn-sm rounded-pill px-3 ${generoSeleccionado.toLowerCase() === genero.toLowerCase() ? 'btn-warning fw-bold' : 'btn-outline-secondary text-white'}`}
                  onClick={() => setGeneroSeleccionado(genero)}
                >
                  {genero}
                </button>
              ))}
            </div>
          )}
        </div>

        {!cargando && peliculasRecientes.length > 0 && (
          <div className="mb-5">
            <h5 className="text-warning fw-bold mb-3 d-flex align-items-center gap-2">
              <span>🔥</span> Producciones Destacadas y Recién Agregadas
            </h5>

            <div 
              id="carouselRecientes" 
              className="carousel slide shadow-lg rounded bg-black border border-secondary border-opacity-25" 
              data-bs-ride="carousel"
              data-bs-interval="4000"
              data-bs-pause="hover"
            >
              <div className="carousel-inner p-4 p-md-5">
                {peliculasRecientes.map((movie, idx) => (
                  <div key={movie._id} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                    <div className="row align-items-center g-4">

                      <div className="col-lg-4 col-md-5 text-center d-flex justify-content-center align-items-center">
                        <img 
                          src={movie.imagen || 'https://via.placeholder.com/400x500?text=Sin+Imagen'} 
                          className="img-fluid rounded shadow-lg" 
                          style={{ maxHeight: '340px', width: 'auto', objectFit: 'contain' }}
                          alt={movie.titulo} 
                        />
                      </div>

                      {/* Columna de la Información */}
                      <div className="col-lg-8 col-md-7 text-center text-md-start px-md-4">
                        <span className="badge bg-warning text-dark mb-3 fw-bold px-3 py-2 fs-6">
                          ✨ Destacada #{idx + 1}
                        </span>
                        <h2 className="fw-bold text-white mb-3 display-6">{movie.titulo}</h2>
                        <p className="text-light opacity-85 fs-6 mb-4" style={{ lineHeight: '1.6' }}>
                          {movie.sinopsis || 'Sinopsis no disponible para esta producción. Disfruta de su contenido completo explorando el catálogo general.'}
                        </p>
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
                          <span className="badge border border-warning text-warning px-3 py-2 fs-6">Año: {movie.anioEstreno || 'N/D'}</span>
                          <span className="badge bg-secondary text-light px-3 py-2 fs-6">Serial: {movie.serial}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Controles de navegación del carrusel */}
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselRecientes" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-dark bg-opacity-75 rounded-circle p-3 shadow" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselRecientes" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-dark bg-opacity-75 rounded-circle p-3 shadow" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        )}

        {/* Estado de Carga / Cuadrícula de Contenido */}
        {cargando ? (
          <div className="loading-wrapper text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="mt-3 text-muted">Sincronizando catálogo...</p>
          </div>
        ) : (
          <div className="row g-4">
            {peliculasFiltradas.length > 0 ? (
              peliculasFiltradas.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            ) : (
              <div className="empty-state text-center py-5">
                <p className="text-muted fs-5">No se encontraron producciones asociadas a este filtro.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};