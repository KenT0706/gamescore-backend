const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define(
  "User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password"
    },
    isVerified:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field:'is_verified'
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: true,
      defaultValue: 'user',
      field: 'role'
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
    region_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'region',
        key: 'id'
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'team',
        key: 'id'
      }
    },
    score: {
      type: DataTypes.INTEGER, // or DataTypes.FLOAT if you want to store decimal values
      allowNull: false // or true, depending on whether the score is mandatory for each entry
    }
  },
  {
    tableName: "users",
    timestamps: false
  },
  
)

module.exports = User;

