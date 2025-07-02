import React, { useState } from 'react';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleCreateGroup = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupName, targetAmount, deadline })
      });
      const data = await res.json();
      alert(`Groupe créé avec clé de sécurité : ${data.hashKey}`);
    } catch (err) {
      console.error("Erreur réseau création groupe:", err);
    }
  };

  return (
    <div className="card p-4">
      <h2>Créer un Groupe</h2>
      <input className="form-control mb-3" placeholder="Nom du groupe" value={groupName} onChange={e => setGroupName(e.target.value)} />
      <input className="form-control mb-3" type="number" placeholder="Montant cible" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} />
      <input className="form-control mb-3" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <button className="btn btn-primary" onClick={handleCreateGroup}>Créer</button>
    </div>
  );
}