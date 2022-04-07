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
      Box.belongsTo(models.sizes);
    }
  };
  
  Box.init({
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    status:DataTypes.ENUM('WORKING','OUT_OF_SERVICE'),
    availibility:DataTypes.INTEGER,
    code:DataTypes.STRING,
    boardId:DataTypes.STRING,
    doorNumber:DataTypes.STRING,
    idcabine: DataTypes.INTEGER,
    idsize: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'box',
  });
  return Box;
};