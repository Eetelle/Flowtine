// FRONTEND - Interface React (Tableau de bord logistique)

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { MapPin, PackageSearch, Truck } from "lucide-react";

export default function Dashboard() {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/harvests")
      .then(res => res.json())
      .then(data => {
        setHarvests(data);
        setLoading(false);
      });
  }, []);

  const filtered = harvests.filter(h =>
    h.farmer.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">📦 GDIZ Smart Logistics</h1>
      <Input placeholder="Rechercher un producteur ou une zone..." onChange={e => setSearch(e.target.value)} />

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Truck /> Tournées actives</h2>
            <p className="text-3xl">7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><MapPin /> Zones couvertes</h2>
            <p className="text-3xl">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><PackageSearch /> Lots en transit</h2>
            <p className="text-3xl">36</p>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producteur</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Quantité (kg)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={5}>Chargement...</TableCell></TableRow>
          ) : (
            filtered.map((h, i) => (
              <TableRow key={i}>
                <TableCell>{h.farmer}</TableCell>
                <TableCell>{h.location}</TableCell>
                <TableCell>{h.product}</TableCell>
                <TableCell>{h.quantity}</TableCell>
                <TableCell>{h.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
