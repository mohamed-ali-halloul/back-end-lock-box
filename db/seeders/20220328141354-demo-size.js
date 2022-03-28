'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sizes',[{
      name:'Small',
      value:'Small',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   {name:'Meduim',
   value:'Meduim',
   createdAt: new Date(),
   updatedAt: new Date()

   },
   {
    name:'Big',
    value:'Big',
    createdAt: new Date(),
    updatedAt: new Date()
   }
  ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sizes',null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
