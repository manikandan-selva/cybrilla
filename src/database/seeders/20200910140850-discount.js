'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_discounts', 
    [{
        productId: "1",
        quantity:3,
        discountPercent:16.66,
      createdAt: new Date(),
      updatedAT: new Date()
    },
    {
      productId: "2",
      quantity:2,
      discountPercent:12.5,
    createdAt: new Date(),
    updatedAT: new Date()
  }  
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_discounts', null, {});
  }
};