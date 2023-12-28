const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // region_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'region',
    //     key: 'id'
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'team'
  }
);

module.exports = Team;
