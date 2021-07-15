'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      quantity: {
        allowNull:false,
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      cost:{
        allowNull:false,
        type: Sequelize.FLOAT,
        defaultValue:1
      },
      discount:{
        allowNull:false,
        type: Sequelize.FLOAT,
        defaultValue:1,
      },
      
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.addIndex('cart', ['productId', 'userId']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cart');
  }
};


