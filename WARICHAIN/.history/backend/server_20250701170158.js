const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const tontines = []; // mémoire temporaire

app.post("/api/group", (req, res) => {
  const { groupName, memberName } = req.body;
  const groupId = uuidv4();
  tontines.push({ groupId, groupName, members: [{ name: memberName }], contributions: [] });
  res.json({ message: `Groupe \"${groupName}\" créé avec succès.`, groupId });
});

app.post("/api/group/:id/member", (req, res) => {
  const { id } = req.params;
  const { memberName } = req.body;
  const group = tontines.find(g => g.groupId === id);
  if (!group) return res.status(404).json({ message: "Groupe introuvable." });
  group.members.push({ name: memberName });
  res.json({ message: `Membre \"${memberName}\" ajouté.` });
});

app.post("/api/group/:id/contribute", (req, res) => {
  const { id } = req.params;
  const { memberName, amount } = req.body;
  const group = tontines.find(g => g.groupId === id);
  if (!group) return res.status(404).json({ message: "Groupe introuvable." });
  group.contributions.push({ memberName, amount: parseFloat(amount), date: new Date().toISOString() });
  res.json({ message: `${memberName} a contribué ${amount} FCFA.` });
});

app.listen(port, () => {
  console.log(`Tontine backend lancé sur http://localhost:${port}`);
});
