import React, { useState, useEffect } from 'react';

export default function AddMember() {
  const [memberName, setMemberName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const res = await fetch("http://localhost:4000/api/savings");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => { fetchGroups(); }, []);

  const handleAddMember = async () => {
    if (!groupId || !memberName) return;
    await fetch(`http://localhost:4000/api/savings/${groupId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName })
    });
    alert("Membre ajouté !");
  };

  return (
    <div className="card p-4">
      <h2>Ajouter un Membre</h2>
      <select className="form-select mb-3" value={groupId} onChange={e => setGroupId(e.target.value)}>
        <option value="">-- Sélectionner un groupe --</option>
        {groups.map(g => <option key={g.groupId} value={g.groupId}>{g.groupName}</option>)}
      </select>
      <input className="form-control mb-3" placeholder="Nom du membre" value={memberName} onChange={e => setMemberName(e.target.value)} />
      <button className="btn btn-success" onClick={handleAddMember}>Ajouter</button>
    </div>
  );
}