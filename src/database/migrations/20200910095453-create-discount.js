'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_discounts', {
      discountId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        unique:true,
        references: {
          model: {
            tableName: 'products'
          },
          key: 'productId'
        }
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      discountPercent:{
        allowNull:false,
        type: Sequelize.FLOAT
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
    await queryInterface.addIndex('product_discounts', ['productId']);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_discounts');
  }
};