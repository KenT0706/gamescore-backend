const express  = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController.js');

router.get('/top-players', leaderboardController.getTopPlayers);

module.exports = router;
