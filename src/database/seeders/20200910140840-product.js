'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      productName: 'A',
      quantityAvailable:100,
      cost:30,
      status:'available',
      createdAt: new Date(),
      updatedAT: new Date()
    },
    {
      productName: 'B',
      quantityAvailable:100,
      cost:20,
      status:'available',
      createdAt: new Date(),
      updatedAT: new Date()
    },
    {
      productName: 'C',
      quantityAvailable:100,
      cost:50,
      status:'available',
      createdAt: new Date(),
      updatedAT: new Date()
    },
    {
      productName: 'D',
      quantityAvailable:100,
      cost:15,
      status:'available',
      createdAt: new Date(),
      updatedAT: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};