const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Game = sequelize.define(
  "Game", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at"
    },
  },
  {
    tableName: "games",
    timestamps: false
  },
)

module.exports = Game;
