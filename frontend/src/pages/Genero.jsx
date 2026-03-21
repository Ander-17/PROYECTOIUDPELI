import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const Genero = () => {
  const [generos, setGeneros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo'); 
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const obtenerGeneros = async () => {
    try {
      const { data } = await apiClient.get('/generos'); 
      setGeneros(data);
      setCargando(false);
    } catch (error) {
      console.error("Error API:", error);
      setCargando(false);
    }
  };

  const guardarOActualizar = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombre, descripcion, estado };
      if (editando) {
        await apiClient.put(`/generos/${idEditar}`, payload);
      } else {
        await apiClient.post('/generos', { ...payload, estado: 'Activo' });
      }
      cancelarEdicion();
      obtenerGeneros();
    } catch (error) {
      alert(error.response?.data?.msg || "Error en el servidor");
    }
  };

  const prepararEdicion = (genero) => {
    setEditando(true);
    setIdEditar(genero._id);
    setNombre(genero.nombre);
    setDescripcion(genero.descripcion);
    setEstado(genero.estado);
    window.scrollTo(0, 0);
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setIdEditar(null);
    setNombre('');
    setDescripcion('');
    setEstado('Activo');
  };

  useEffect(() => { obtenerGeneros(); }, []);

  return (
    <div className="container mt-4 pb-5">
      <h2 className="text-warning mb-4 fw-bold">🎬 CIUDA: Gestión de Géneros</h2>

      <div className={`card admin-card border-${editando ? 'info' : 'secondary'} mb-5 shadow`}>
        <div className="card-body">
          <h5 className={editando ? "text-info fw-bold" : "text-light fw-bold"}>
            {editando ? "📝 Modificar Registro" : "➕ Nuevo Género"}
          </h5>
          
          <form onSubmit={guardarOActualizar} className="row g-3 mt-2">
            <div className="col-md-4">
              <label className="text-info small">Nombre</label>
              <input type="text" className="form-control admin-input" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="text-info small">Descripción</label>
              <input type="text" className="form-control admin-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            {editando && (
              <div className="col-md-2">
                <label className="text-info small">Estado</label>
                <select className="form-select admin-input" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            )}
            <div className={`col-md-${editando ? '2' : '4'} d-flex align-items-end gap-2`}>
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
                  <th className="ps-4">Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cargando ? (
                  <tr><td colSpan="4" className="py-4 text-info">Cargando...</td></tr>
                ) : generos.map((g) => (
                  <tr key={g._id}>
                    <td className="ps-4 fw-bold">{g.nombre}</td>
                    <td className="admin-table-text">{g.descripcion || '---'}</td>
                    <td>
                      <span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {g.estado}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-info" onClick={() => prepararEdicion(g)}>Editar</button>
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