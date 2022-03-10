'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref: {
        type: Sequelize.STRING,
        allowNull:false    
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false 
      },
      size: {
        type: Sequelize.ENUM('Big','Small','Medium')

      },
      price: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idcabine: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('boxes');
  }
};