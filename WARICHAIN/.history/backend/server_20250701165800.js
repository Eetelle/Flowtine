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
  tontines.push({ groupId, groupName, members: [{ name: memberName }] });
  res.json({ message: `Groupe \"${groupName}\" créé avec succès.` });
});

app.listen(port, () => {
  console.log(`Tontine backend lancé sur http://localhost:${port}`);
});
