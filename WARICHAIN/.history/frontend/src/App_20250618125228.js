import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

function App() {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    farmer: "",
    location: "",
    product: "",
    quantity: "",
    status: "en attente",
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Modal state
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/harvests")
      .then((res) => res.json())
      .then((data) => {
        setHarvests(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    const url = editId
      ? `http://localhost:3001/api/harvests/${editId}`
      : "http://localhost:3001/api/harvests";
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (editId) {
      setHarvests(harvests.map((h) => (h._id === editId ? data : h)));
      setEditId(null);
    } else {
      setHarvests([...harvests, data]);
    }

    setForm({ farmer: "", location: "", product: "", quantity: "", status: "en attente" });
  };

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`http://localhost:3001/api/harvests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setHarvests(harvests.map((h) => (h._id === id ? updated : h)));
  };

  const deleteHarvest = async (id) => {
    await fetch(`http://localhost:3001/api/harvests/${id}`, { method: "DELETE" });
    setHarvests(harvests.filter((h) => h._id !== id));
  };

  const filtered = harvests.filter((h) =>
    h.farmer.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = () => {
    setSelectedCountry("");
    setSelectedCity("");
    const modal = new window.bootstrap.Modal(document.getElementById("locationModal"));
    modal.show();
  };

  const handleLocationConfirm = () => {
    if (!selectedCountry || !selectedCity) return alert("Veuillez choisir un pays et une ville.");
    setForm({ ...form, location: `${selectedCity}, ${selectedCountry}` });
    const modal = window.bootstrap.Modal.getInstance(document.getElementById("locationModal"));
    modal.hide();
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">📦 GDIZ - Récoltes</h1>

      <input
        className="form-control mb-3"
        placeholder="Rechercher un producteur ou une localisation..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="row g-3 mb-5">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Agriculteur"
            value={form.farmer}
            onChange={(e) => setForm({ ...form, farmer: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Localisation"
              value={form.location}
              readOnly
              required
            />
            <button type="button" className="btn btn-outline-secondary" onClick={openModal}>
              📍 Choisir
            </button>
          </div>
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Produit"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            placeholder="Quantité (kg)"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editId ? "✏️ Modifier" : "➕ Ajouter"}
          </button>
        </div>
      </form>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Agriculteur</th>
                <th>Localisation</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>{item.farmer}</td>
                  <td>{item.location}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity} kg</td>
                  <td>
                    <span className={`badge ${item.status === "collecté" ? "bg-success" : "bg-warning text-dark"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button
                        onClick={() => updateStatus(item._id, "collecté")}
                        className="btn btn-success btn-sm"
                      >
                        ✅ Collecté
                      </button>
                      <button
                        onClick={() => updateStatus(item._id, "en attente")}
                        className="btn btn-warning btn-sm"
                      >
                        🕒 Non Collecté
                      </button>
                      <button
                        onClick={() => {
                          setForm(item);
                          setEditId(item._id);
                        }}
                        className="btn btn-info btn-sm text-white"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => deleteHarvest(item._id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑 Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🌍 Modal Pays + Ville */}
      <div
        className="modal fade"
        id="locationModal"
        tabIndex="-1"
        aria-labelledby="locationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="locationModalLabel">Choisir une localisation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div className="modal-body">
              <select className="form-select mb-3" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
                <option value="">Sélectionnez un pays</option>
                <option value="Bénin">🇧🇯 Bénin</option>
                <option value="Togo">🇹🇬 Togo</option>
                <option value="Burkina Faso">🇧🇫 Burkina Faso</option>
              </select>
              <select className="form-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                <option value="">Sélectionnez une ville</option>
                {selectedCountry === "Bénin" && (
                  <>
                    <option value="Cotonou">Cotonou</option>
                    <option value="Porto-Novo">Porto-Novo</option>
                    <option value="Parakou">Parakou</option>
                  </>
                )}
                {selectedCountry === "Togo" && (
                  <>
                    <option value="Lomé">Lomé</option>
                    <option value="Sokodé">Sokodé</option>
                  </>
                )}
                {selectedCountry === "Burkina Faso" && (
                  <>
                    <option value="Ouagadougou">Ouagadougou</option>
                    <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                  </>
                )}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" className="btn btn-primary" onClick={handleLocationConfirm}>Valider</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
