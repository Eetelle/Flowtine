import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Bienvenue à la Plateforme de Formation de Conduite</h1>
      <Link to="/register" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">S'inscrire</Link>
    </div>
  );
}

export default HomePage;