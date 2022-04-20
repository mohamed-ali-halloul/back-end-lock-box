'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      box.belongsTo(models.cabine, {
        allowNull: false,
        foreignKey: 'idcabine',
        as: 'cabines',
        onDelete: 'CASCADE'
      }); 
      box.belongsTo(models.sizes,{
        allowNull: false,
        foreignKey:'idsize',
        as:'sizes',
        onDelete:'CASCADE'
      });

    }
  }
  box.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    availibility: DataTypes.INTEGER,
    boardID: DataTypes.STRING,
    doorNumber: DataTypes.STRING,
   
    
  }, {
    sequelize,
    modelName: 'box',
  });
  return box;
};