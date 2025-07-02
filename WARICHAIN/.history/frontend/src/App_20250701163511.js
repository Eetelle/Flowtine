import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateGroup = async () => {
    const res = await fetch("http://localhost:4000/api/group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupName, memberName })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
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
            <Label>Nom du membre</Label>
            <Input
              placeholder="Ton nom complet"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </div>

          <Button onClick={handleCreateGroup}>Créer le groupe</Button>

          {message && <p className="text-green-500">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}