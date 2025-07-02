// === FRONTEND REACT — Écran de création de groupe d’épargne Lightning avec Bootstrap ===

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [memberName, setMemberName] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [groups, setGroups] = useState([]);

  const handleCreateGroup = async () => {
    const res = await fetch("http://localhost:4000/api/savings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupName, targetAmount, deadline })
    });
    await res.json();
    fetchGroups();
  };

  const handleDeposit = async () => {
    const res = await fetch(`http://localhost:4000/api/savings/${selectedGroupId}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName, amount: depositAmount })
    });
    const data = await res.json();
    setInvoice(data.invoice);
  };

  const fetchGroups = async () => {
    const res = await fetch("http://localhost:4000/api/savings");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Créer un groupe d'épargne</h2>
      <div className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">Nom du groupe</label>
          <input type="text" className="form-control" value={groupName} onChange={e => setGroupName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant cible (sats)</label>
          <input type="number" className="form-control" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de fin</label>
          <input type="date" className="form-control" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={handleCreateGroup}>Créer le groupe</button>
      </div>

      <h3 className="mb-3">Groupes existants</h3>
      <ul className="list-group mb-4">
        {groups.map(group => (
          <li key={group.groupId} className="list-group-item">
            <strong>{group.groupName}</strong> — cible: {group.targetAmount} sats, fin: {group.deadline}
          </li>
        ))}
      </ul>

      <h3 className="mb-3">Simuler un dépôt</h3>
      <div className="card p-4">
        <div className="mb-3">
          <label className="form-label">Nom du membre</label>
          <input type="text" className="form-control" value={memberName} onChange={e => setMemberName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant à déposer (sats)</label>
          <input type="number" className="form-control" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Groupe</label>
          <select className="form-select" value={selectedGroupId} onChange={e => setSelectedGroupId(e.target.value)}>
            <option value="">-- Sélectionner un groupe --</option>
            {groups.map(group => (
              <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" onClick={handleDeposit}>Déposer</button>

        {invoice && (
          <div className="alert alert-info mt-3">
            <strong>Invoice générée :</strong><br />
            <code>{invoice}</code>
          </div>
        )}
      </div>
    </div>
  );
}
