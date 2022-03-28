'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Boxes',{
      fields : ['idsize'],
      type:'foreign key',
      name:'box-size-association',
      references: {
        table :'sizes',
        field :'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Boxes',{
      fields : ['idsize'],
      type:'foreign key',
      name:'box-size-association',
      references: {
        table :'sizes',
       field :'id'
      }
    })
  
  }
};