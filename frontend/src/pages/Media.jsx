import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const Media = () => {
  const [medias, setMedias] = useState([]);
  const [catalogos, setCatalogos] = useState({ generos: [], directores: [], productoras: [], tipos: [] });
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [serialEditar, setSerialEditar] = useState(null);

  const [form, setForm] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', imagen: '', 
    anioEstreno: '', generoPrincipal: '', directorPrincipal: '', productora: '', tipo: ''
  });

  const cargarDatos = async () => {
    try {
      const [resMedia, resGen, resDir, resProd, resTip] = await Promise.all([
        apiClient.get('/media'), apiClient.get('/generos'),
        apiClient.get('/directores'), apiClient.get('/productoras'), apiClient.get('/tipos')
      ]);
      setMedias(resMedia.data);
      setCatalogos({ generos: resGen.data, directores: resDir.data, productoras: resProd.data, tipos: resTip.data });
      setCargando(false);
    } catch (error) {
      console.error("Error API:", error);
      setCargando(false);
    }
  };

  const guardarOActualizar = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await apiClient.put(`/media/${serialEditar}`, form);
      } else {
        await apiClient.post('/media', form);
      }
      cancelarEdicion();
      cargarDatos();
    } catch (error) {
      alert(error.response?.data?.msg || "Error en la operación");
    }
  };

  const eliminarMedia = async (serial) => {
    if (window.confirm(`¿Eliminar producción con serial: ${serial}?`)) {
      try {
        await apiClient.delete(`/media/${serial}`);
        cargarDatos();
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const prepararEdicion = (m) => {
    setEditando(true);
    setSerialEditar(m.serial);
    setForm({
      serial: m.serial, titulo: m.titulo, sinopsis: m.sinopsis || '',
      url: m.url || '', imagen: m.imagen || '', anioEstreno: m.anioEstreno || '',
      generoPrincipal: m.generoPrincipal?._id || '',
      directorPrincipal: m.directorPrincipal?._id || '',
      productora: m.productora?._id || '',
      tipo: m.tipo?._id || ''
    });
    window.scrollTo(0, 0);
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setSerialEditar(null);
    setForm({ serial: '', titulo: '', sinopsis: '', url: '', imagen: '', anioEstreno: '', generoPrincipal: '', directorPrincipal: '', productora: '', tipo: '' });
  };

  useEffect(() => { cargarDatos(); }, []);

  return (
    <div className="container mt-4 pb-5">
      <h2 className="text-warning mb-4 fw-bold">🎬 CIUDA: Gestión de Media</h2>

      <div className={`card admin-card border-${editando ? 'info' : 'secondary'} mb-5 shadow`}>
        <div className="card-body">
          <h5 className={editando ? "text-info fw-bold" : "text-light fw-bold mb-4"}>
            {editando ? `📝 Modificando: ${form.titulo}` : "➕ Registrar Nueva Producción"}
          </h5>
          
          <form onSubmit={guardarOActualizar} className="row g-3">
            <div className="col-md-2">
              <label className="text-info small fw-bold">Serial</label>
              <input name="serial" className="form-control admin-input" value={form.serial} onChange={handleChange} required disabled={editando} />
            </div>
            <div className="col-md-5">
              <label className="text-info small fw-bold">Título</label>
              <input name="titulo" className="form-control admin-input" value={form.titulo} onChange={handleChange} required />
            </div>
            <div className="col-md-5">
              <label className="text-info small fw-bold">URL Contenido</label>
              <input name="url" className="form-control admin-input" value={form.url} onChange={handleChange} required />
            </div>

            <div className="col-md-7">
              <label className="text-info small fw-bold">Sinopsis</label>
              <input name="sinopsis" className="form-control admin-input" value={form.sinopsis} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label className="text-info small fw-bold">Imagen (URL)</label>
              <input name="imagen" className="form-control admin-input" value={form.imagen} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <label className="text-info small fw-bold">Año</label>
              <input name="anioEstreno" type="number" className="form-control admin-input" value={form.anioEstreno} onChange={handleChange} />
            </div>

            <div className="col-md-3">
              <label className="text-info small fw-bold">Género</label>
              <select name="generoPrincipal" className="form-select admin-input" value={form.generoPrincipal} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                {catalogos.generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="text-info small fw-bold">Director</label>
              <select name="directorPrincipal" className="form-select admin-input" value={form.directorPrincipal} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                {catalogos.directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="text-info small fw-bold">Productora</label>
              <select name="productora" className="form-select admin-input" value={form.productora} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                {catalogos.productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="text-info small fw-bold">Tipo</label>
              <select name="tipo" className="form-select admin-input" value={form.tipo} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                {catalogos.tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
              </select>
            </div>

            <div className="col-12 d-flex gap-2 mt-4">
              <button type="submit" className={`btn ${editando ? 'btn-info' : 'btn-warning'} fw-bold w-100`}>
                {editando ? "ACTUALIZAR" : "GUARDAR"}
              </button>
              {editando && <button type="button" className="btn btn-outline-danger px-4" onClick={cancelarEdicion}>CANCELAR</button>}
            </div>
          </form>
        </div>
      </div>

      <div className="card admin-card shadow">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead className="admin-table-head">
              <tr>
                <th className="ps-3">Producción</th>
                <th>Género / Tipo</th>
                <th>Director</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="4" className="text-center py-4 text-info">Cargando catálogo...</td></tr>
              ) : medias.map((m) => (
                <tr key={m._id}>
                  <td className="ps-3">
                    <div className="fw-bold text-warning">{m.titulo}</div>
                    <span className="admin-table-subtitle">
                      #Serial: {m.serial} • Año: {m.anioEstreno}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark me-1">{m.generoPrincipal?.nombre}</span>
                    <span className="badge border border-secondary small">{m.tipo?.nombre}</span>
                  </td>
                  <td>{m.directorPrincipal?.nombres}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-info me-2" onClick={() => prepararEdicion(m)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarMedia(m.serial)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};