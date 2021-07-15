const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    "products",
    {
      productId: { type: DataTypes.INTEGER,primaryKey:true,allowNull: false,
        autoIncrement: true,
      },
      productName: { type: DataTypes.STRING },
      quantityAvailable: { type: DataTypes.INTEGER },
      cost: { type: DataTypes.FLOAT },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      freezeTableName: true,
      timestamps: false
    }

  );
  products.associate = (models) => {
    products.belongsTo(models.cart, {
      as: 'products',
      foreignKey: 'productId'
    });
  };

  return products;
};
