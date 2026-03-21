import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const Tipo = () => {
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const obtenerTipos = async () => {
    try {
      const { data } = await apiClient.get('/tipos');
      setTipos(data);
      setCargando(false);
    } catch (error) {
      console.error("Error API:", error);
      setCargando(false);
    }
  };

  const guardarOActualizar = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombre, descripcion };
      if (editando) {
        await apiClient.put(`/tipos/${idEditar}`, payload);
      } else {
        await apiClient.post('/tipos', payload);
      }
      cancelarEdicion();
      obtenerTipos();
    } catch (error) {
      alert(error.response?.data?.msg || "Error en el servidor");
    }
  };

  const prepararEdicion = (tipo) => {
    setEditando(true);
    setIdEditar(tipo._id);
    setNombre(tipo.nombre);
    setDescripcion(tipo.descripcion || '');
    window.scrollTo(0, 0);
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setIdEditar(null);
    setNombre('');
    setDescripcion('');
  };

  useEffect(() => { obtenerTipos(); }, []);

  return (
    <div className="container mt-4 pb-5">
      <h2 className="text-warning mb-4 fw-bold">🎬 CIUDA: Gestión de Tipos</h2>

      <div className={`card admin-card border-${editando ? 'info' : 'secondary'} mb-5 shadow`}>
        <div className="card-body">
          <h5 className={editando ? "text-info fw-bold" : "text-light fw-bold"}>
            {editando ? "📝 Modificar Registro" : "➕ Nuevo Tipo de Contenido"}
          </h5>
          
          <form onSubmit={guardarOActualizar} className="row g-3 mt-2">
            <div className="col-md-5">
              <label className="text-info small">Nombre del Formato</label>
              <input type="text" className="form-control admin-input" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-5">
              <label className="text-info small">Descripción</label>
              <input type="text" className="form-control admin-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div className="col-md-2 d-flex align-items-end gap-2">
              <button type="submit" className={`btn ${editando ? 'btn-info' : 'btn-warning'} fw-bold w-100 shadow-sm`}>
                {editando ? "Actualizar" : "Guardar"}
              </button>
              {editando && <button type="button" className="btn btn-outline-danger" onClick={cancelarEdicion}>X</button>}
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
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cargando ? (
                  <tr><td colSpan="3" className="py-4 text-info">Cargando...</td></tr>
                ) : tipos.map((t) => (
                  <tr key={t._id}>
                    <td className="fw-bold">{t.nombre}</td>
                    {/* Aplicada clase para visibilidad de descripción */}
                    <td className="admin-table-text">{t.descripcion || '---'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-info" onClick={() => prepararEdicion(t)}>Editar</button>
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