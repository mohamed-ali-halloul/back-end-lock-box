'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cabine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cabine.hasMany(models.box,{
        foreignKey:'idcabine',
        as: 'boxes',
      })
    }
  }
  cabine.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },ref: DataTypes.STRING,
    name: DataTypes.STRING,
    network_type: DataTypes.STRING,
    shortLink: DataTypes.STRING,
    mode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cabine',
  });
  return cabine;
};