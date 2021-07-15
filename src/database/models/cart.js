module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define(
      "cart",
      {
        cartId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productId: {
            type: DataTypes.INTEGER
        },
        userId: { type: DataTypes.STRING(15) },
        quantity: { type: DataTypes.FLOAT },
        discount: { type: DataTypes.FLOAT },
        cost: { type: DataTypes.FLOAT },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
    cart.associate = (models) => {
      cart.belongsTo(models.products, {
        as: "products",
        foreignKey: 'productId'
      });
      cart.belongsTo(models.discounts, {
        as: "discounts",
        foreignKey: 'productId'
      });
    };
  
    return cart;
  };
  