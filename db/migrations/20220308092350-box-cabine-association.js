'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Boxes',{
      fields : ['idcabine'],
      type:'foreign key',
      name:'box-cabine-association',
      references: {
        table :'Cabines',
        field :'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Boxes',{
      fields : ['idcabine'],
      type:'foreign key',
      name:'box-cabine-association',
      references: {
        table :'Cabines',
       field :'id'
      }
    })
  
  }
};