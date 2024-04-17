const express = require("express");
const gamesController = require("../controllers/games.controller.js");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get(
  "/",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.index 
);
router.post(
  "/",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.storeGame
);
router.get(
  "/:gameId/edit",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.editGame
);
router.post(
  "/:gameId/edit",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.updateGame
);
router.put(
  "/:gameId",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.updateGame
);
router.delete(
  "/:gameId",
  verifyToken,
  checkRole(["user", "admin"]),
  gamesController.deleteGame
);

module.exports = router;
