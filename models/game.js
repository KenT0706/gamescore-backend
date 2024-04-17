const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Game = sequelize.define(
  "Game",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    title: {
      type: DataTypes.STRING,
      field: "title",
    },
    platform: {
      type: DataTypes.STRING,
      field: "platform",
    },
    genre: {
      type: DataTypes.STRING,
      field: "genre",
    },
    release_date: {
      type: DataTypes.DATE,
      field: "release_date",
    },
    additional_note: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "additional_note",
    },
    tags: {
      type: DataTypes.STRING,
      field: "tags",
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "progress",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
  },
  {
    tableName: "games",
    timestamps: false,
  }
);

module.exports = Game;
