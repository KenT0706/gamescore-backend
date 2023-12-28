const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Score = sequelize.define(
  "Score", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'score'
  }
);

module.exports = Score;
