// src/pages/Order.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import pharmacies from '../data/pharmacies';
import products from '../data/products';

function Order() {
  const { pharmacyId, medId } = useParams();
  const navigate = useNavigate();

  const pharmacy = pharmacies.find((ph) => ph.id === pharmacyId);
  const product = products.find((p) => p.id === medId);

  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!pharmacy || !product) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-danger">Pharmacie ou médicament introuvable</h4>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </Container>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu pourrais appeler une API pour enregistrer la commande
    setOrderPlaced(true);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm p-4">
        <h3 className="mb-3">Passer commande</h3>

        <p>
          <strong>Pharmacie :</strong> {pharmacy.name} <br />
          <strong>Adresse :</strong> {pharmacy.location} <br />
          <strong>Médicament :</strong> {product.name}
        </p>

        {orderPlaced && (
          <Alert variant="success" onClose={() => setOrderPlaced(false)} dismissible>
            Commande passée avec succès !
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantité</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Confirmer la commande
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Annuler
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Order;
