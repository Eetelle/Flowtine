// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import crypto from 'crypto';
import Group from './models/Group.js'; // ← ici on importe le modèle

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/lightning_savings');

// === API Routes ===

app.get('/api/savings', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

app.post('/api/savings', async (req, res) => {
  const { groupName, targetAmount, deadline } = req.body;
  const hashKey = crypto.createHash('sha256').update(groupName + Date.now()).digest('hex');
  const newGroup = new Group({ groupName, targetAmount, deadline, hashKey, members: [], contributions: [] });
  await newGroup.save();
  res.json({ message: 'Groupe créé', hashKey });
});

app.post('/api/savings/:groupId/members', async (req, res) => {
  const { memberName } = req.body;
  const group = await Group.findById(req.params.groupId);
  group.members.push(memberName);
  await group.save();
  res.json({ message: 'Membre ajouté' });
});

app.post('/api/savings/:groupId/deposit', async (req, res) => {
  const { memberName, amount, hashKey } = req.body;
  const group = await Group.findById(req.params.groupId);
  if (group.hashKey !== hashKey) return res.status(403).json({ error: 'Clé invalide' });

  group.contributions.push({ memberName, amount });
  await group.save();

  const fakeInvoice = `lnbc1${Math.floor(Math.random() * 1e6)}...generated`;
  res.json({ invoice: fakeInvoice });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Backend prêt sur http://localhost:${PORT}`));
