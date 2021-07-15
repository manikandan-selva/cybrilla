module.exports = (sequelize, DataTypes) => {
  const discounts = sequelize.define(
    "product_discounts",
    {
      discountId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      productId: { type: DataTypes.INTEGER,unique:true,
        references: {
        model: {
          tableName: 'products'
        },
        key: 'productId'
      } },
      quantity: { type: DataTypes.INTEGER },
      discountPercent: { type: DataTypes.FLOAT },
      
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  discounts.associate = (models) => {
    discounts.belongsTo(models.products, {
      as: "products",
      foreignKey: 'productId'
    });
  };

  return discounts;
};
