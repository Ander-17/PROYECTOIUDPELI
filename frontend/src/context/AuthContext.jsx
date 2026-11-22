import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiClient'; // Importamos tu cliente de Axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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