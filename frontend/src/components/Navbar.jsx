import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiclient';

export const Navbar = () => {
  const { esAutenticado, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Listas para los dropdowns públicos
  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);

  useEffect(() => {
    // Si la sesión NO está activa, cargamos los datos desde /media para extraer los nombres reales asociados
    if (!esAutenticado) {
      const cargarDatosMenu = async () => {
        try {
          const { data } = await apiClient.get('/media');
          if (Array.isArray(data)) {
            const g = [...new Set(data.map(m => m.generoPrincipal?.nombre || m.generoPrincipal?.nombres).filter(Boolean))];
            const t = [...new Set(data.map(m => m.tipo?.nombre || m.tipo?.nombres).filter(Boolean))];
            
            // CORRECCIÓN CLAVE: Apuntamos exactamente a 'directorPrincipal.nombres' tal como está en Media.jsx
            const d = [...new Set(data.map(m => m.directorPrincipal?.nombres || m.directorPrincipal?.nombre || m.director?.nombres || m.director?.nombre).filter(Boolean))];
            
            const p = [...new Set(data.map(m => m.productora?.nombre || m.productora?.nombres).filter(Boolean))];

            setGeneros(g);
            setTipos(t);
            setDirectores(d);
            setProductoras(p);
          }
        } catch (error) {
          console.error("Error al cargar opciones del Navbar:", error);
        }
      };
      cargarDatosMenu();
    }
  }, [esAutenticado]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const filtrarPor = (tipoFiltro, valor) => {
    navigate('/');
    setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (valor) {
        params.set(tipoFiltro, valor);
      } else {
        params.delete(tipoFiltro);
      }
      setSearchParams(params);
    }, 50);
  };

  const handleSearchClick = () => {
    navigate('/');
    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder*="Buscar"]');
      if (searchInput) searchInput.focus();
    }, 100);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-lg border-bottom border-secondary border-opacity-25 py-2">
      <div className="container">
        
        {/* Logo / Marca */}
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center text-warning me-4" to="/">
          <span className="me-2">🎬</span> CIUDA
        </Link>
        
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav me-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link px-3 fw-medium ${isActive ? 'text-warning border-bottom border-warning border-3 rounded-bottom pb-1 active' : 'text-light'}`
                } 
                to="/"
              >
                Inicio
              </NavLink>
            </li>

            {/* --- MODO ADMINISTRADOR: ENLACES CRUD --- */}
            {esAutenticado ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      `nav-link px-3 fw-medium ${isActive ? 'text-warning border-bottom border-warning border-3 rounded-bottom pb-1 active' : 'text-light'}`
                    } 
                    to="/generos"
                  >
                    Géneros
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      `nav-link px-3 fw-medium ${isActive ? 'text-warning border-bottom border-warning border-3 rounded-bottom pb-1 active' : 'text-light'}`
                    } 
                    to="/tipos"
                  >
                    Tipos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      `nav-link px-3 fw-medium ${isActive ? 'text-warning border-bottom border-warning border-3 rounded-bottom pb-1 active' : 'text-light'}`
                    } 
                    to="/directores"
                  >
                    Directores
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      `nav-link px-3 fw-medium ${isActive ? 'text-warning border-bottom border-warning border-3 rounded-bottom pb-1 active' : 'text-light'}`
                    } 
                    to="/productoras"
                  >
                    Productoras
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => 
                      `nav-link px-3 fw-medium ${isActive ? 'text-warning border-bottom border-warning border-3 rounded-bottom pb-1 active' : 'text-light'}`
                    } 
                    to="/media"
                  >
                    Media
                  </NavLink>
                </li>
              </>
            ) : (
              /* --- MODO VISITANTE PÚBLICO: DROPDOWNS --- */
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle px-3 fw-medium text-light" href="#" role="button" data-bs-toggle="dropdown">
                    Géneros
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow-lg">
                    <li><button className="dropdown-item" onClick={() => filtrarPor('genero', '')}>Todos los géneros</button></li>
                    {generos.map((nombre, idx) => (
                      <li key={idx}><button className="dropdown-item" onClick={() => filtrarPor('genero', nombre)}>{nombre}</button></li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle px-3 fw-medium text-light" href="#" role="button" data-bs-toggle="dropdown">
                    Tipos
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow-lg">
                    <li><button className="dropdown-item" onClick={() => filtrarPor('tipo', '')}>Todos los tipos</button></li>
                    {tipos.map((nombre, idx) => (
                      <li key={idx}><button className="dropdown-item" onClick={() => filtrarPor('tipo', nombre)}>{nombre}</button></li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle px-3 fw-medium text-light" href="#" role="button" data-bs-toggle="dropdown">
                    Directores
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow-lg" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <li><button className="dropdown-item" onClick={() => filtrarPor('director', '')}>Todos los directores</button></li>
                    {directores.map((nombre, idx) => (
                      <li key={idx}><button className="dropdown-item" onClick={() => filtrarPor('director', nombre)}>{nombre}</button></li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle px-3 fw-medium text-light" href="#" role="button" data-bs-toggle="dropdown">
                    Productoras
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow-lg" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <li><button className="dropdown-item" onClick={() => filtrarPor('productora', '')}>Todas las productoras</button></li>
                    {productoras.map((nombre, idx) => (
                      <li key={idx}><button className="dropdown-item" onClick={() => filtrarPor('productora', nombre)}>{nombre}</button></li>
                    ))}
                  </ul>
                </li>
              </>
            )}
          </ul>

          {/* Acciones de la Derecha */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <button 
              onClick={handleSearchClick}
              className="btn btn-outline-warning btn-sm px-3 py-1 rounded-pill d-flex align-items-center gap-2 fw-medium shadow-sm"
            >
              <span>🔍</span> Buscar
            </button>

            {esAutenticado && (
              <button 
                onClick={handleLogout} 
                className="btn btn-outline-danger btn-sm px-3 py-1 rounded-pill fw-medium shadow-sm"
              >
                Cerrar Sesión
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};