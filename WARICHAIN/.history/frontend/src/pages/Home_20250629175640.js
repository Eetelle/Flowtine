import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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

      <section id="about" className="section-block bg-light text-dark text-center py-5">
        <div className="container">
          <h2 className="display-5 mb-3 animate__animated animate__fadeInUp">À propos de nous</h2>
          <p className="lead animate__animated animate__fadeInUp">
            Nous sommes une auto-école numérique qui vous accompagne tout au long de votre apprentissage. Notre mission est de rendre la formation de conduite accessible, moderne et interactive.
          </p>
        </div>
      </section>

      <section id="contact" className="section-block bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="display-5 mb-4 animate__animated animate__fadeInUp">Contactez-nous</h2>
          <form className="row g-3 justify-content-center animate__animated animate__fadeInUp">
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="Nom complet" required />
            </div>
            <div className="col-md-5">
              <input type="email" className="form-control" placeholder="Adresse email" required />
            </div>
            <div className="col-10">
              <textarea className="form-control" rows="4" placeholder="Votre message" required></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-light">Envoyer</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer-section text-center text-white py-4 animate__animated animate__fadeInUp">
        <div>© {new Date().getFullYear()} MonAutoÉcole. Tous droits réservés.</div>
        <div className="mt-2">
          <a href="#contact" className="text-white text-decoration-underline me-3">Contact</a>
          <a href="#about" className="text-white text-decoration-underline">À propos</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;