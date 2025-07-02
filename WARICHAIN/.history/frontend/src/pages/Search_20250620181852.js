import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import pharmacies from '../data/pharmacies';
import products from '../data/products';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredProducts = products.filter((prod) =>
      prod.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredProducts);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🔍 Rechercher un médicament</h2>

      <Form onSubmit={handleSearch}>
        <Row>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Ex: Doliprane, Paracetamol..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">
              Rechercher
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mt-4">
        {results.length > 0 ? (
          results.map((product) => (
            <Col md={6} lg={4} className="mb-3" key={product.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <h6>Disponible dans :</h6>
                  {pharmacies
                    .filter((pharm) => pharm.products.includes(product.id))
                    .map((pharm) => (
                      <div key={pharm.id} className="d-flex justify-content-between align-items-center my-2">
                        <span>{pharm.name} ({pharm.location})</span>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => navigate(`/pharmacy/${pharm.id}`)}
                        >
                          Voir
                        </Button>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center mt-5 text-muted">
            <p>Aucun résultat. Essayez un autre médicament.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Search;
