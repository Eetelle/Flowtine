// BACKEND - Serveur Express.js (API REST pour GDIZ Logistics)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gdiz-logistics', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const HarvestSchema = new mongoose.Schema({
  farmer: String,
  location: String,
  product: String,
  quantity: Number,
  status: String // "en attente", "collecté", "en transit", etc.
});

const Harvest = mongoose.model('Harvest', HarvestSchema);

app.use(cors());
app.use(express.json());

// Get all harvests
app.get('/api/harvests', async (req, res) => {
  try {
    const data = await Harvest.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Add a new harvest entry
app.post('/api/harvests', async (req, res) => {
  try {
    const newHarvest = new Harvest(req.body);
    await newHarvest.save();
    res.status(201).json(newHarvest);
  } catch (err) {
    res.status(400).json({ error: 'Échec d\'enregistrement' });
  }
});

// Update a harvest status
app.put('/api/harvests/:id', async (req, res) => {
  try {
    const updated = await Harvest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Échec de mise à jour' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GDIZ Logistics API listening on http://localhost:${PORT}`);
});
