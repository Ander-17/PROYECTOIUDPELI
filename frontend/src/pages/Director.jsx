import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const Director = () => {
  const [directores, setDirectores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nombres, setNombres] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const obtenerDirectores = async () => {
    try {
      const { data } = await apiClient.get('/directores');
      setDirectores(data);
      setCargando(false);
    } catch (error) {
      console.error("Error API:", error);
      setCargando(false);
    }
  };

  const guardarOActualizar = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombres, estado };
      if (editando) {
        await apiClient.put(`/directores/${idEditar}`, payload);
      } else {
        await apiClient.post('/directores', { ...payload, estado: 'Activo' });
      }
      cancelarEdicion();
      obtenerDirectores();
    } catch (error) {
      alert(error.response?.data?.msg || "Error en el servidor");
    }
  };

  const prepararEdicion = (dir) => {
    setEditando(true);
    setIdEditar(dir._id);
    setNombres(dir.nombres);
    setEstado(dir.estado);
    window.scrollTo(0, 0);
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setIdEditar(null);
    setNombres('');
    setEstado('Activo');
  };

  useEffect(() => { obtenerDirectores(); }, []);

  return (
    <div className="container mt-4 pb-5">
      <h2 className="text-warning mb-4 fw-bold">🎬 Gestión de Directores</h2>

      <div className={`card admin-card border-${editando ? 'info' : 'secondary'} mb-5 shadow`}>
        <div className="card-body">
          <h5 className={editando ? "text-info fw-bold" : "text-light fw-bold"}>
            {editando ? "📝 Modificar Registro" : "➕ Nuevo Director"}
          </h5>
          
          <form onSubmit={guardarOActualizar} className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="text-info small">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control admin-input" 
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required 
              />
            </div>

            {editando && (
              <div className="col-md-3">
                <label className="text-info small">Estado</label>
                <select 
                  className="form-select admin-input"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            )}

            <div className={`col-md-${editando ? '3' : '6'} d-flex align-items-end gap-2`}>
              <button type="submit" className={`btn ${editando ? 'btn-info' : 'btn-warning'} fw-bold w-100 shadow-sm`}>
                {editando ? "Actualizar" : "Guardar"}
              </button>
              {editando && (
                <button type="button" className="btn btn-outline-danger" onClick={cancelarEdicion}>X</button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card admin-card shadow">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0 align-middle">
              <thead className="admin-table-head text-center">
                <tr>
                  <th>Nombres</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cargando ? (
                  <tr><td colSpan="3" className="py-4 text-info">Cargando...</td></tr>
                ) : directores.map((d) => (
                  <tr key={d._id}>
                    <td className="fw-bold">{d.nombres}</td>
                    <td>
                      <span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {d.estado}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-info" onClick={() => prepararEdicion(d)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};