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
        <div key={group.groupId} className="card mb-4 p-3">
          <h4>{group.groupName}</h4>
          <p>Cible : {group.targetAmount} sats | Échéance : {group.deadline}</p>
          <p>Clé : <code>{group.hashKey}</code></p>
          <p>Membres : {group.members.join(', ')}</p>
          <p>Contributions :</p>
          <ul>
            {group.contributions.map((c, i) => (
              <li key={i}>{c.memberName} → {c.amount} sats</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}