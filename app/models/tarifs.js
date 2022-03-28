'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarifs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tarifs.belongsTo(models.sizes);

    }
  }
  tarifs.init({
    duration: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    date_debut: DataTypes.DATE,
    display: DataTypes.INTEGER,
    idsize: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'tarifs',
  });
  return tarifs;
};