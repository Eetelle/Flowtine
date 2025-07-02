// === FRONTEND REACT — Gestion avancée de groupes d’épargne Lightning ===

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [memberName, setMemberName] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  const handleCreateGroup = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupName, targetAmount, deadline })
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        fetchGroups();
      } catch (err) {
        console.error("Erreur JSON création groupe:", text);
        alert("Erreur serveur lors de la création du groupe.");
      }
    } catch (err) {
      console.error("Erreur réseau création groupe:", err);
    }
  };

  const handleAddMember = async () => {
    if (!selectedGroupId || !memberName) return;
    try {
      const res = await fetch(`http://localhost:4000/api/savings/${selectedGroupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberName })
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        fetchGroups();
      } catch (err) {
        console.error("Erreur JSON ajout membre:", text);
        alert("Erreur serveur lors de l'ajout du membre.");
      }
    } catch (err) {
      console.error("Erreur réseau ajout membre:", err);
    }
  };

  const handleDeposit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/savings/${selectedGroupId}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberName, amount: depositAmount })
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setInvoice(data.invoice);
        fetchGroups();
      } catch (err) {
        console.error("Erreur JSON dépôt:", text);
        alert("Erreur serveur lors du dépôt.");
      }
    } catch (err) {
      console.error("Erreur réseau dépôt:", err);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/savings");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error("Erreur récupération groupes:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-primary animate__animated animate__fadeInDown">Créer un groupe d'épargne</h2>
      <div className="card p-4 mb-4 shadow animate__animated animate__fadeIn">
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

      <h3 className="mb-3">Tableau de bord</h3>
      {groups.map(group => (
        <div key={group.groupId} className="card mb-4 shadow-sm p-3 animate__animated animate__fadeInUp">
          <h5 className="card-title">{group.groupName}</h5>
          <p>Montant cible : {group.targetAmount} sats</p>
          <p>Échéance : {group.deadline}</p>
          <p><strong>Membres :</strong></p>
          <ul>
            {group.members.map((member, idx) => (
              <li key={idx}>{member}</li>
            ))}
          </ul>
          <p><strong>Contributions :</strong></p>
          <ul>
            {group.contributions.map((c, i) => (
              <li key={i}>{c.memberName} → {c.amount} sats {c.paid ? "✅" : "⏳"}</li>
            ))}
          </ul>
          <button className="btn btn-warning mt-2">Autoriser paiements finaux</button>
        </div>
      ))}

      <h3 className="mb-3">Ajouter un membre</h3>
      <div className="card p-3 mb-4">
        <div className="mb-3">
          <label className="form-label">Nom du membre</label>
          <input type="text" className="form-control" value={memberName} onChange={e => setMemberName(e.target.value)} />
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
        <button className="btn btn-secondary" onClick={handleAddMember}>Ajouter au groupe</button>
      </div>

      <h3 className="mb-3">Simuler un dépôt</h3>
      <div className="card p-4 animate__animated animate__pulse">
        <div className="mb-3">
          <label className="form-label">Montant à déposer (sats)</label>
          <input type="number" className="form-control" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
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
