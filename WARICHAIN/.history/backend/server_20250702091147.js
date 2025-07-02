// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const savingsGroups = [];

// Créer un groupe
app.post("/api/savings", (req, res) => {
  const { groupName, targetAmount, deadline } = req.body;
  const groupId = uuidv4();
  const newGroup = {
    groupId,
    groupName,
    targetAmount: parseInt(targetAmount),
    deadline,
    members: [],
    contributions: []
  };
  savingsGroups.push(newGroup);
  res.json({ message: "Groupe créé", groupId });
});

// Lister les groupes
app.get("/api/savings", (req, res) => {
  res.json(savingsGroups);
});

// Ajouter un membre
app.post("/api/savings/:id/members", (req, res) => {
  const { id } = req.params;
  const { memberName } = req.body;
  const group = savingsGroups.find(g => g.groupId === id);
  if (!group) return res.status(404).json({ message: "Groupe introuvable" });
  if (!group.members.includes(memberName)) {
    group.members.push(memberName);
  }
  res.json({ message: "Membre ajouté" });
});

// Simuler un dépôt
app.post("/api/savings/:id/deposit", async (req, res) => {
  const { id } = req.params;
  const { memberName, amount } = req.body;
  const group = savingsGroups.find(g => g.groupId === id);
  if (!group) return res.status(404).json({ message: "Groupe non trouvé" });

  try {
    const response = await axios.post("http://localhost:8080/v1/invoices", {
      memo: `Dépôt ${memberName}`,
      value: parseInt(amount)
    }, {
      headers: {
        "Grpc-Metadata-macaroon": "TON_MACAROON_HEX",
        "Content-Type": "application/json"
      }
    });

    const invoice = response.data.payment_request;
    const rHash = Buffer.from(response.data.r_hash, 'base64').toString('hex');

    group.contributions.push({
      memberName,
      amount: parseInt(amount),
      invoice,
      rHash,
      paid: false
    });

    res.json({ invoice });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erreur LND" });
  }
});

// Vérifier une invoice et la marquer comme payée
app.get("/api/invoice/:rHash", async (req, res) => {
  const { rHash } = req.params;
  try {
    const response = await axios.get(`http://localhost:8080/v1/invoice/${rHash}`, {
      headers: {
        "Grpc-Metadata-macaroon": "TON_MACAROON_HEX",
        "Content-Type": "application/json"
      }
    });

    const settled = response.data.settled;

    // mise à jour en mémoire
    for (const group of savingsGroups) {
      const contribution = group.contributions.find(c => c.rHash === rHash);
      if (contribution) {
        contribution.paid = settled;
        break;
      }
    }

    res.json({ settled });
  } catch (err) {
    res.status(500).json({ message: "Échec vérification" });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend écoutant sur http://localhost:${port}`);
});
