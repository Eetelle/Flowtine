import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ ajout de useNavigate
import pharmacies from '../data/pharmacies';
import products from '../data/products';

function PharmacyDetail() {
  const { id } = useParams();
  const pharmacy = pharmacies.find((ph) => ph.id === id);

  if (!pharmacy) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-danger">Pharmacie introuvable</h4>
      </Container>
    );
  }

  const meds = products.filter((prod) => pharmacy.products.includes(prod.id));

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="text-primary">{pharmacy.name}</h3>
          <p className="text-muted">📍 {pharmacy.location}</p>
        </Card.Body>
      </Card>

      <h4 className="mt-4 mb-3">💊 Médicaments disponibles</h4>

      <Row>
        {meds.length ? (
          meds.map((med) => (
            <Col md={6} lg={4} key={med.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{med.name}</Card.Title>
                  <Card.Text>{med.description}</Card.Text>
                  <Button
  variant="success"
  onClick={() => navigate(`/order/${pharmacy.id}/${med.id}`)}
>
  Commander
</Button>
                  
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Aucun médicament enregistré pour cette pharmacie.</p>
        )}
      </Row>
    </Container>
  );
}

export default PharmacyDetail;
