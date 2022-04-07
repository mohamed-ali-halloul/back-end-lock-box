'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.addColumn('boxes','status', 
      {
        type: Sequelize.ENUM('WORKING','OUT_OF_SERVICE'),
  } ,{transaction}
      );
      await queryInterface.addColumn(
        'boxes',
        'code',
        {
          type: Sequelize.STRING,
    } ,{transaction}
      );
      await queryInterface.addColumn(
        'boxes',
        'availibility',
        {
          type: Sequelize.INTEGER,
    } ,{transaction}
      );
      await queryInterface.addColumn(
        'boxes',
        'boardId',
        {
          type: Sequelize.STRING,
    } ,{transaction}
      );
      await queryInterface.addColumn(
        'boxes',
        'doorNumber',
        {
          type: Sequelize.STRING,
    } ,{transaction}
      );
      await queryInterface.removeColumn(
        'boxes',
        'size',{transaction}
      ),
      await queryInterface.removeColumn(
        'boxes',
        'price',{transaction}
      ),
      await transaction.commit();
  }catch(err){
    await transaction.rollback();
  }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeColumn('boxes','status',{transaction});
      await queryInterface.removeColumn('boxes','code',{transaction});
      await queryInterface.removeColumn('boxes','availibility',{transaction});
      await queryInterface.removeColumn('boxes','boardId',{transaction});
      await queryInterface.removeColumn('boxes','doorNumber',{transaction});

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
