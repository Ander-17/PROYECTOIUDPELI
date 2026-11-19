import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Footer = () => {
  const { esAutenticado } = useAuth();
  const anioActual = new Date().getFullYear();
  
  return (
    <footer className="footer-container mt-5 bg-dark text-white border-top border-secondary border-opacity-25 py-4 shadow-lg">
      <div className="container text-center">
        <p className="footer-text mb-1 fw-bold text-warning">
          © {anioActual} CIUDA | Banco de Películas IU Digital de Antioquia
        </p>
        {/* Cambiamos text-muted por text-white (puedes usar text-white-50 si lo quieres un tono más suave) */}
        <span className="footer-subtext text-white small">
          {esAutenticado 
            ? "Tecnología en Desarrollo de Software - Panel de Administración" 
            : "Tecnología en Desarrollo de Software - Portal Público de Streaming"}
        </span>
      </div>
    </footer>
  );
};