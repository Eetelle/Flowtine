// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="#">TontineLN</a>
        <div className="ml-auto">
          <button className="btn btn-outline-light">Se connecter</button>
        </div>
      </nav>

      {/* Tableau de bord */}
      <div className="container my-5">
        <h2 className="mb-4">Tableau de bord</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Mon solde</h5>
                <p className="display-6">10 000 FCFA</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Date de retrait prévue</h5>
                <p>15 Août 2025</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Statut</h5>
                <span className="badge bg-warning text-dark">Fonds bloqués</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Participation */}
      <div className="container my-5">
        <h2 className="mb-4">Participer à la Tontine</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Montant à verser</label>
            <input type="number" className="form-control" placeholder="Ex: 5000 FCFA" />
          </div>
          <button type="submit" className="btn btn-primary">Payer avec Lightning ⚡</button>
        </form>
      </div>

      {/* Demande de retrait */}
      <div className="container my-5">
        <h2 className="mb-4">Demander un retrait</h2>
        <p>Conditions requises :</p>
        <ul>
          <li>3 membres doivent valider</li>
          <li>Pas d’objection pendant 48h</li>
          <li>Vous avez participé à toutes les tournées précédentes</li>
        </ul>
        <button className="btn btn-success">Faire une demande de retrait</button>
      </div>

      {/* Historique */}
      <div className="container my-5">
        <h2 className="mb-4">Historique des transactions</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Membre</th>
              <th>Type</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kossi</td>
              <td>Versement</td>
              <td>5000 FCFA</td>
              <td>2025-06-20</td>
              <td><span className="badge bg-success">Confirmé</span></td>
            </tr>
            <tr>
              <td>Fatou</td>
              <td>Retrait</td>
              <td>50 000 FCFA</td>
              <td>2025-06-28</td>
              <td><span className="badge bg-warning text-dark">En attente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
