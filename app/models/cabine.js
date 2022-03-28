'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cabine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cabine.hasMany(models.box);
     
    }
  }
  Cabine.init({
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    network_type:DataTypes.STRING,
    mode:DataTypes.STRING,
    shortLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cabine',
  });
  return Cabine;
};