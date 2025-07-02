import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './home.css'; // 🔥 pour les animations et le style

function Home() {
  return (
    <div className="hero-section">
      <div className="overlay">
        <Container className="text-light text-center hero-content">
          <Row>
            <Col md={12}>
              <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">💊 PharmXpresso</h1>
              <p className="lead animate__animated animate__fadeInUp animate__delay-1s">
                La plateforme digitale de santé du futur.
              </p>
              <p className="animate__animated animate__fadeInUp animate__delay-2s">
                Commandez vos médicaments <strong>en un clic</strong> et faites-les livrer à votre porte.
              </p>
              <Link to="/search">
                <Button className="glow-btn mt-4">🔍 Rechercher un médicament</Button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-5 features">
            <Col md={4} className="animate__animated animate__zoomIn animate__delay-3s">
              <Card className="feature-card">
                <Card.Body>
                  <i className="fas fa-shipping-fast fa-3x mb-3 text-info"></i>
                  <h5>Livraison ultra-rapide</h5>
                  <p>Moins de 24h avec suivi GPS intégré.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="animate__animated animate__zoomIn animate__delay-4s">
              <Card className="feature-card">
                <Card.Body>
                  <i className="fas fa-lock fa-3x mb-3 text-success"></i>
                  <h5>Paiement 100% sécurisé</h5>
                  <p>MoMo, Fedapay, KKiapay. Paiement instantané.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="animate__animated animate__zoomIn animate__delay-5s">
              <Card className="feature-card">
                <Card.Body>
                  <i className="fas fa-map-marker-alt fa-3x mb-3 text-warning"></i>
                  <h5>Pharmacies autour de vous</h5>
                  <p>Un algorithme géolocalise vos besoins.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
