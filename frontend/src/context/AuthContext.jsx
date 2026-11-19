import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiclient'; // Importamos tu cliente de Axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Usamos una bandera booleana o de persistencia simple en localStorage 
  // para saber si el usuario inició sesión, mientras la cookie HttpOnly 
  // protege el token real en las peticiones al backend.
  const [esAutenticado, setEsAutenticado] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [cargando, setCargando] = useState(false);

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setEsAutenticado(true);
  };

  const logout = async () => {
    try {
      // Opcional: Llamamos al backend para que limpie/destruya la cookie HttpOnly
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    }
    
    localStorage.removeItem('isLoggedIn');
    setEsAutenticado(false);
  };

  return (
    <AuthContext.Provider
      value={{
        esAutenticado,
        cargando,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};