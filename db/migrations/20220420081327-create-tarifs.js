'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tarifs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      date_debut: {
        type: Sequelize.DATE
      },
      display: {
        type: Sequelize.INTEGER
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tarifs');
  }
};