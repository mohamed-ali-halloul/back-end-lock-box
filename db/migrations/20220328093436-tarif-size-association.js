'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('tarifs',{
      fields : ['idsize'],
      type:'foreign key',
      name:'tarif-size-association',
      references: {
        table :'sizes',
        field :'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('tarifs',{
      fields : ['idsize'],
      type:'foreign key',
      name:'tarif-size-association',
      references: {
        table :'sizes',
       field :'id'
      }
    })
  
  }
};