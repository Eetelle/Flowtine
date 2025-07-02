const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/courses', auth, (req, res) => {
  res.json([
    { id: 1, title: 'Code de la route', video: 'https://example.com/video1' },
    { id: 2, title: 'Signalisation', video: 'https://example.com/video2' },
  ]);
});

module.exports = router;
