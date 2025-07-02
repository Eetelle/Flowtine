import React, { useEffect, useState } from "react";

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
    const res = await fetch("http://localhost:3001/api/harvests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setHarvests([...harvests, data]);
    setForm({
      farmer: "",
      location: "",
      product: "",
      quantity: "",
      status: "en attente",
    });
  };

  const updateStatus = async (id) => {
    const res = await fetch(`http://localhost:3001/api/harvests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "collecté" }),
    });
    const updated = await res.json();
    setHarvests(harvests.map((h) => (h._id === id ? updated : h)));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">📦 GDIZ - Tableau des récoltes</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-2"
          placeholder="Agriculteur"
          value={form.farmer}
          onChange={(e) => setForm({ ...form, farmer: e.target.value })}
          required
        />
        <input
          className="border p-2"
          placeholder="Localisation"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          className="border p-2"
          placeholder="Produit"
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Quantité (kg)"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-full"
          type="submit"
        >
          ➕ Ajouter la récolte
        </button>
      </form>

      {/* Tableau des récoltes */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Agriculteur</th>
              <th className="border px-4 py-2">Localisation</th>
              <th className="border px-4 py-2">Produit</th>
              <th className="border px-4 py-2">Quantité</th>
              <th className="border px-4 py-2">Statut</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {harvests.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border px-4 py-2">{item.farmer}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.product}</td>
                <td className="border px-4 py-2">{item.quantity} kg</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => updateStatus(item._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    ✅ Marquer collecté
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
