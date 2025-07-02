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
  res.json({ message: "Groupe créé avec succès.", groupId });
});

app.get("/api/savings", (req, res) => {
  res.json(savingsGroups);
});

app.post("/api/savings/:id/deposit", async (req, res) => {
  const { id } = req.params;
  const { memberName, amount } = req.body;
  const group = savingsGroups.find(g => g.groupId === id);
  if (!group) return res.status(404).json({ message: "Groupe non trouvé." });

  try {
    const response = await axios.post("http://localhost:8080/v1/invoices", {
      memo: `Dépôt de ${memberName} pour ${group.groupName}`,
      value: parseInt(amount)
    }, {
      headers: {
        "Grpc-Metadata-macaroon": "YOUR_MACAROON_HEX", // Remplace par ton macaroon hex
        "Content-Type": "application/json"
      }
    });

    const invoice = response.data.payment_request;
    const rHash = Buffer.from(response.data.r_hash, 'base64').toString('hex');

    group.contributions.push({ memberName, amount: parseInt(amount), invoice, rHash, paid: false });
    res.json({ invoice });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erreur LND", error: err.message });
  }  
});

app.get("/api/invoice/:rHash", async (req, res) => {
  const { rHash } = req.params;

  try {
    const response = await axios.get(`http://localhost:8080/v1/invoice/${rHash}`, {
      headers: {
        "Grpc-Metadata-macaroon": "YOUR_MACAROON_HEX",
        "Content-Type": "application/json"
      }
    });

    res.json({ settled: response.data.settled });
  } catch (e) {
    console.error("Erreur lecture paiement:", e.message);
    res.status(500).json({ message: "Erreur vérification paiement." });
  }
});

app.listen(port, () => {
  console.log(`Tontine backend lancé sur http://localhost:${port}`);
});
