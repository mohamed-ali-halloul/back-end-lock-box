'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sizes.hasMany(models.box);
      sizes.hasMany(models.tarifs);
    }
  }
  sizes.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sizes',
  });
  return sizes;
};