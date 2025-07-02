import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
        <Col md={10}>
          <h1 className="display-4 mb-3 text-primary fw-bold">PharmXpresso</h1>
          <p className="lead">
            💊 La première plateforme digitale de médicaments au Bénin.
          </p>
          <p>
            Fini les longues files d’attente. Fini les déplacements inutiles.
            <br />
            Cherchez, commandez et recevez vos médicaments chez vous.
          </p>
          <Link to="/search">
            <Button variant="success" size="lg" className="mt-3">
              🔍 Rechercher un médicament
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>📦 Livraison rapide</h5>
              <p>En moins de 24h avec nos partenaires locaux.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>💰 Paiement local sécurisé</h5>
              <p>MoMo, Fedapay, KKiapay – tout est intégré.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>🔎 Disponibilité en temps réel</h5>
              <p>Un moteur intelligent vous indique les pharmacies proches.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
