import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type.includes('image') || selected.type.includes('pdf'))) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError('');
    } else {
      setFile(null);
      setError('Veuillez sélectionner une image ou un PDF valide.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Aucun fichier sélectionné.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pharmxpresso_unsigned'); // change this to your own

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setUrl(data.secure_url);
    } catch (err) {
      setError('Échec de l’envoi. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">📸 Upload de votre ordonnance</h3>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Sélectionnez une photo ou un PDF</Form.Label>
        <Form.Control type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
      </Form.Group>

      {preview && (
        <div className="mb-3">
          <strong>Aperçu :</strong><br />
          {file.type.includes('pdf') ? (
            <a href={preview} target="_blank" rel="noreferrer">Voir le PDF</a>
          ) : (
            <img src={preview} alt="preview" style={{ maxWidth: '300px' }} />
          )}
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={handleUpload} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Envoyer'}
      </Button>

      {url && (
        <Alert variant="success" className="mt-3">
          Upload réussi ! <a href={url} target="_blank" rel="noreferrer">Voir le fichier</a>
        </Alert>
      )}
    </Container>
  );
}

export default UploadPrescription;
