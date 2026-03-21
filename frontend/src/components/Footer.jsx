import React from 'react';

export const Footer = () => {
  const anioActual = new Date().getFullYear();
  
  return (
    <footer className="footer-container mt-5">
      <div className="container">
        <p className="footer-text">
          © {anioActual} CIUDA | Banco de Películas IU Digital de Antioquia
        </p>
        <span className="footer-subtext">
          Tecnología en Desarrollo de Software - Panel de Administración
        </span>
      </div>
    </footer>
  );
};