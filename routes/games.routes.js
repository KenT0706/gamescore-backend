const express = require("express");
const gamesController = require("../controllers/games.controller.js");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.put(
  "/:gameId",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.updateGame
);

module.exports = router;
