import React, { useState, useEffect } from 'react';

export default function Deposit() {
  const [groupId, setGroupId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [hashKey, setHashKey] = useState("");
  const [groups, setGroups] = useState([]);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/savings")
      .then(res => res.json())
      .then(data => setGroups(data));
  }, []);

  const handleDeposit = async () => {
    const res = await fetch(`http://localhost:4000/api/savings/${groupId}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName, amount, hashKey })
    });
    const data = await res.json();
    setInvoice(data.invoice);
  };

  return (
    <div className="card p-4">
      <h2>Dépôt dans un Groupe</h2>
      <select className="form-select mb-3" value={groupId} onChange={e => setGroupId(e.target.value)}>
        <option value="">-- Groupe --</option>
        {groups.map(g => <option key={g.groupId} value={g.groupId}>{g.groupName}</option>)}
      </select>
      <input className="form-control mb-2" placeholder="Nom du membre" value={memberName} onChange={e => setMemberName(e.target.value)} />
      <input className="form-control mb-2" placeholder="Montant (sats)" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <input className="form-control mb-2" placeholder="Clé de sécurité (hashKey)" value={hashKey} onChange={e => setHashKey(e.target.value)} />
      <button className="btn btn-info" onClick={handleDeposit}>Envoyer</button>
      {invoice && <div className="alert alert-light mt-3">Invoice générée :<br/><code>{invoice}</code></div>}
    </div>
  );
}
