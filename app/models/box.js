'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Box.belongsTo(models.Cabine);
     
    }
  };
  
  Box.init({
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    size: DataTypes.ENUM('Big','Small','Medium'),      
    price: DataTypes.DOUBLE,
    idcabine: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'box',
  });
  return Box;
};