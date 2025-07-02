import React, { useState, useEffect } from 'react';
//import { FaUserPlus, FaUsers, FaBitcoin } from 'react-icons/fa';
import 'animate.css';

export default function AddMember() {
  const [memberName, setMemberName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const res = await fetch("http://localhost:4000/api/savings");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleAddMember = async () => {
    if (!groupId || !memberName) return;
    await fetch(`http://localhost:4000/api/savings/${groupId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName })
    });
    alert("✅ Membre ajouté avec succès !");
    setMemberName("");
  };

  return (
    <div className="card glass animate__animated animate__fadeInDown p-4 text-light">
      <h2 className="text-neon mb-4">
        <FaUserPlus className="me-2" />
        Ajouter un Membre
      </h2>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          <FaUsers className="me-2" />
          Sélectionner un groupe
        </label>
        <select
          className="form-select neon-input"
          value={groupId}
          onChange={e => setGroupId(e.target.value)}
        >
          <option value="">-- Choisir un groupe --</option>
          {groups.map(g => (
            <option key={g.groupId} value={g.groupId}>{g.groupName}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          <FaBitcoin className="me-2" />
          Nom du membre
        </label>
        <input
          type="text"
          className="form-control neon-input"
          placeholder="Satoshi Nakamoto"
          value={memberName}
          onChange={e => setMemberName(e.target.value)}
        />
      </div>

      <button className="btn neon-btn w-100 mt-3" onClick={handleAddMember}>
        🚀 Ajouter au groupe
      </button>
    </div>
  );
}
