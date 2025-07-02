import React, { useState, useEffect } from "react";
import { MapPin, PackageSearch, Truck } from "lucide-react";

export default function App() {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/harvests")
      .then(res => res.json())
      .then(data => {
        setHarvests(data);
        setLoading(false);
      });
  }, []);

  const filtered = harvests.filter(h =>
    h.farmer.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>📦 GDIZ Smart Logistics</h1>

      <input
        placeholder="Rechercher un producteur ou une zone..."
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 20 }}
      />

      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={{ border: "1px solid gray", padding: 16, flex: 1 }}>
          <h2><Truck /> Tournées actives</h2>
          <p style={{ fontSize: 24 }}>7</p>
        </div>
        <div style={{ border: "1px solid gray", padding: 16, flex: 1 }}>
          <h2><MapPin /> Zones couvertes</h2>
          <p style={{ fontSize: 24 }}>12</p>
        </div>
        <div style={{ border: "1px solid gray", padding: 16, flex: 1 }}>
          <h2><PackageSearch /> Lots en transit</h2>
          <p style={{ fontSize: 24 }}>36</p>
        </div>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Producteur</th>
            <th>Localisation</th>
            <th>Produit</th>
            <th>Quantité (kg)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5}>Chargement...</td></tr>
          ) : (
            filtered.map((h, i) => (
              <tr key={i}>
                <td>{h.farmer}</td>
                <td>{h.location}</td>
                <td>{h.product}</td>
                <td>{h.quantity}</td>
                <td>{h.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
