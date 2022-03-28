'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.addColumn('Cabines','network_type', 
      {
        type: Sequelize.STRING,
  } ,{transaction}
      );
      await queryInterface.addColumn(
        'Cabines',
        'mode',
        {
          type: Sequelize.STRING,
    } ,{transaction}
      );
      await queryInterface.addColumn(
        'Cabines',
        'shortLink',
        {
          type: Sequelize.STRING,
    } ,{transaction}
      );
      await transaction.commit();
  }catch(err){
    await transaction.rollback();
  }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeColumn('Cabines','network_type',{transaction});
      await queryInterface.removeColumn('Cabines','mode',{transaction});
      await queryInterface.removeColumn('Cabines','shortLink',{transaction});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
    }


    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  
};
