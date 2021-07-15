'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
    productId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    productName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    cost:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    quantityAvailable:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'available'//1 // 1. Acitve ,2.In Active
      },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
},
down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('products');
}
}