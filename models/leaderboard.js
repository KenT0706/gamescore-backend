// const { User, Score, sequelize } = require('../models');

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Leaderboard {

  async getTopPlayers(limit = 10) {
    return await User.findAll({
      include: [{
        model: Score,
        attributes: [[sequelize.fn('MAX', sequelize.col('score')), 'top_score']]
      }],
      group: ['User.id'],
      order: [[sequelize.fn('MAX', sequelize.col('Score.score')), 'DESC']],
      limit: limit,
    });
  }

  // Other leaderboard-related methods can go here...
}

module.exports = new Leaderboard();
