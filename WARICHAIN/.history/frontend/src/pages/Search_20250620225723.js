import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import pharmacies from '../data/pharmacies';
import products from '../data/products';
import './search.css';

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
    <div className="search-page">
      <div className="parallax-bg"></div>
      <Container className="content">
        <h2 className="neon-title text-center mb-5">🔍 Rechercher un médicament</h2>

        <Form onSubmit={handleSearch} className="glass-form p-4 rounded">
          <Row className="align-items-center">
            <Col xs={12} md={10} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                placeholder="💊 Ex: Doliprane, Paracétamol..."
                value={query}
                className="futuristic-input"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <Button type="submit" className="glow-btn w-100">Rechercher</Button>
            </Col>
          </Row>
        </Form>

        <Row className="mt-5">
          {results.length > 0 ? (
            results.map((product) => (
              <Col md={6} lg={4} className="mb-4" key={product.id}>
                <Card className="product-card animate__animated animate__fadeInUp">
                  <Card.Body>
                    <Card.Title className="text-info">{product.name}</Card.Title>
                    <Card.Text className="text-light">{product.description}</Card.Text>
                    <h6 className="text-warning">Disponible dans :</h6>
                    {pharmacies
                      .filter((pharm) => pharm.products.includes(product.id))
                      .map((pharm) => (
                        <div
                          key={pharm.id}
                          className="d-flex justify-content-between align-items-center my-2 text-white-50"
                        >
                          <span>{pharm.name} ({pharm.location})</span>
                          <Button
                            variant="outline-info"
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
            <Col className="text-center mt-5 text-light">
              <p>😕 Aucun résultat. Essayez un autre médicament.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Search;
