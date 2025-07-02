import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'animate.css';
import './Home.css';

function HomePage() {
  return (
    <div className="home-wrapper">
      <nav className="navbar navbar-expand-lg glass-navbar fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
            🚘 MonAutoÉcole
          </Link>
          <div className="ms-auto">
            <Link to="/register" className="btn btn-outline-light me-2">S'inscrire</Link>
          </div>
        </div>
      </nav>

      <div className="hero d-flex align-items-center justify-content-center text-center">
        <div className="text-white animate__animated animate__fadeInDown">
          <h1 className="display-3 fw-bold">Bienvenue à la Plateforme de Formation de Conduite</h1>
          <p className="lead mt-3 animate__animated animate__fadeInUp">
            Apprenez à conduire avec style et assurance.
          </p>
          <Link to="/login" className="btn btn-light btn-lg mt-4 animate__animated animate__zoomIn">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;