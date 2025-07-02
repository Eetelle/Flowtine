import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/savings")
      .then(res => res.json())
      .then(data => setGroups(data));
  }, []);

  return (
    <div>
      <h2>Tableau de bord</h2>
      {groups.map(group => (
  <div key={group._id || group.groupId} className="card mb-4 p-3">
    <h4>{group.groupName}</h4>
    <p>Cible : {group.targetAmount} sats | Échéance : {group.deadline}</p>
    <p>Clé : <code>{group.hashKey}</code></p>
    <p>Membres : {group.members && group.members.length > 0 ? group.members.join(', ') : "Aucun membre"}</p>

    <p>Contributions :</p>
    <ul>
      {Array.isArray(group.contributions) && group.contributions.length > 0 
        ? group.contributions.map((c, i) => (
            <li key={i}>{c.memberName} → {c.amount} sats</li>
          ))
        : <li>Aucune contribution</li>}
    </ul>
  </div>
))}

    </div>
  );
}