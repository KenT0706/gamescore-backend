const Leaderboard = require("../models/leaderboard.js");

async function getTopPlayers(req, res) {
  try {
    const players = await Leaderboard.getTopPlayers(req.query.limit);
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getTopPlayers,
};
