import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [map, setMap] = useState(null);
  const [editId, setEditId] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/harvests")
      .then((res) => res.json())
      .then((data) => {
        setHarvests(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (map || document.getElementById("map")?.innerHTML !== "") return;

    const mapInstance = L.map("map").setView([9.3, 2.3], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);

    mapInstance.on("click", (e) => {
      setCoords(e.latlng);
    });

    setMap(mapInstance);
  }, [map]);

  useEffect(() => {
    if (map && harvests.length) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      harvests.forEach((h) => {
        if (h.coords) {
          L.marker([h.coords.lat, h.coords.lng]).addTo(map).bindPopup(
            `${h.farmer} - ${h.product}`
          );
        }
      });
    }
  }, [map, harvests]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coords) {
      alert("Veuillez cliquer sur la carte pour définir une localisation.");
      return;
    }

    const payload = { ...form, coords };
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
    setCoords(null);
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

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">📦 GDIZ - Récoltes + Carte</h1>

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
          <input
            className="form-control"
            placeholder="Localisation"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
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
                          setCoords(item.coords || null);
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

      <div className="alert alert-info">
        🗺 Cliquez sur la carte pour définir la position géographique de la récolte.
      </div>
      <div id="map" className="w-100 rounded border" style={{ height: "400px" }}></div>
    </div>
  );
}

export default App;
