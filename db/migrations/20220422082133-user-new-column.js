'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  const transaction = await queryInterface.sequelize.transaction();
  try{
    await queryInterface.addColumn('users','code',{
      type: Sequelize.STRING,
    },{transaction});
  }catch(err){
    await transaction.rollback();
  }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeColumn('users','code',{transaction});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
    }
  }
};
