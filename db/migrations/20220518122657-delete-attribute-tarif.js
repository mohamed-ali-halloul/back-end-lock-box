'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'tarifs',
      'date_debut'
    );
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
