import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Sistema de Gestión Multimedia.
        </p>
        <small className="footer-subtext">
          Proyecto académico - Tecnología en Desarrollo de Software | IU Digital de Antioquia
        </small>
      </div>
    </footer>
  );
};