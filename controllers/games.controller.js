const Game = require("../models/game.js");

async function updateGame(req, res) {
  try {
    const updatedGame = await Game.update(req.body, {
      where: { id: req.params.gameId },
    });

    if (updatedGame[0] !== 0) {
      res.json({ message: "Game updated successfully" });
    } else {
      res.json({ message: "Game ID not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  updateGame,
};
