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
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      availibility: {
        type: Sequelize.INTEGER
      },
      boardID: {
        type: Sequelize.STRING
      },
      doorNumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idcabine:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'cabines',
          key: 'id',
          as: 'idcabine',
        }
      },
      idsize:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'sizes',
          key: 'id',
          as: 'idsize',
        }

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('boxes');

  }
};