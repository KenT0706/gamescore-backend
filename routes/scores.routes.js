const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// ... other routes ...

router.post('/submit', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'You must be logged in to submit a score.' });
  }

  try {
    const score = await scoreController.createScore(req, res);
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
