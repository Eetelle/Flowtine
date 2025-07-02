import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [contribution, setContribution] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateGroup = async () => {
    const res = await fetch("http://localhost:4000/api/group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupName, memberName })
    });
    const data = await res.json();
    setMessage(data.message);
    setGroupId(data.groupId);
  };

  const handleAddMember = async () => {
    const res = await fetch(`http://localhost:4000/api/group/${groupId}/member`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName: newMember })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleContribute = async () => {
    const res = await fetch(`http://localhost:4000/api/group/${groupId}/contribute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName, amount: contribution })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 space-y-8">
      <Card className="max-w-lg mx-auto">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">Créer une Tontine</h1>

          <div>
            <Label>Nom du groupe</Label>
            <Input
              placeholder="Ex: Tontine Maman Alice"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div>
            <Label>Nom du membre (créateur)</Label>
            <Input
              placeholder="Ton nom complet"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </div>

          <Button onClick={handleCreateGroup}>Créer le groupe</Button>
        </CardContent>
      </Card>

      {groupId && (
        <Card className="max-w-lg mx-auto">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Groupe: {groupName}</h2>
            <div>
              <Label>Ajouter un membre</Label>
              <Input
                placeholder="Nom du nouveau membre"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <Button onClick={handleAddMember} className="mt-2">Ajouter</Button>
            </div>

            <div>
              <Label>Effectuer une contribution</Label>
              <Input
                placeholder="Montant (ex: 5000)"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
              />
              <Button onClick={handleContribute} className="mt-2">Contribuer</Button>
            </div>

            {message && <p className="text-green-600 font-medium">{message}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
