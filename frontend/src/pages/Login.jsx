import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient'; // 👈 Importamos tu cliente con la URL de Vercel y withCredentials

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargandoEnvio, setCargandoEnvio] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargandoEnvio(true);

    try {
      // Hacemos la petición usando apiClient (la cookie HttpOnly se guarda sola en el navegador)
      await apiClient.post('/auth/login', { email, password });

      // Actualizamos el estado de autenticación en el contexto
      login();

      // Redirigimos a una de tus rutas protegidas (ej. /media)
      navigate('/media');
    } catch (err) {
      // Axios guarda los errores del servidor en err.response?.data
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setCargandoEnvio(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm bg-secondary text-light">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Iniciar Sesión - Admin</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100" 
                  disabled={cargandoEnvio}
                >
                  {cargandoEnvio ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};