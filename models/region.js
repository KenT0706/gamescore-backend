const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Region extends Model {}

Region.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'region'
  }
);

module.exports = Region;
