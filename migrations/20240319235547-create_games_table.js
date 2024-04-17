"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("games", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      platform: {
        type: DataTypes.STRING,
      },
      genre: {
        type: DataTypes.STRING,
      },
      release_date: {
        type: DataTypes.DATE,
      },
      additional_note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING,
      },
      progress: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("games");
  },
};
