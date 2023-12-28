const Score = require("../models/Score.js");

async function getAllScores(req, res) {
  try {
    const scores = await Score.findAll();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getScoreById(req, res) {
  try {
    const score = await Score.findByPk(parseInt(req.params.scoreId));
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createScore(req, res) {
  try {
    const score = await Score.create(req.body);
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateScore(req, res) {
  try {
    const updatedScore = await Score.update(
      req.body,
      {
        where: {
          id: parseInt(req.params.scoreId),
        },
      }
    );
    res.json(updatedScore);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteScore(req, res) {
  try {
    const score = await Score.destroy({
      where: {
        id: parseInt(req.params.scoreId),
      },
    });
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllScores,
  getScoreById,
  createScore,
  updateScore,
  deleteScore,
};
