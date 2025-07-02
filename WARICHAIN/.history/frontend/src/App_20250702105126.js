import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import routes from './pages/routes';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">⚡ Épargne Futuriste</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/create-group">Créer un Groupe</Link>
          <Link className="nav-link" to="/add-member">Ajouter un Membre</Link>
          <Link className="nav-link" to="/deposit">Déposer</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          {routes.map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}