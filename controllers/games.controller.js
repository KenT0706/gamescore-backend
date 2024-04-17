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
async function index(req, res) {
  try {
    const games = await Game.findAll({
      where: {
        user_id: parseInt(req.user.id),
      },
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function editGame(req, res) {
  try {
    const games = await Game.findAll({
      where: {
        id: parseInt(req.params.gameId),
      },
    });
    res.json(games[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function deleteGame(req, res) {
  try {
    const games = await Game.destroy({
      where: {
        id: parseInt(req.params.gameId),
      },
    });
    res.json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function updateGame(req, res) {
  try {
    const game = await Game.update(req.body, {
      where: {
        id: parseInt(req.params.gameId),
      },
    });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function storeGame(req, res) {
  try {
    const game = await Game.create({ ...req.body, user_id: req.user.id });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  updateGame,
  storeGame,
  index,
  editGame,
  deleteGame,
};
