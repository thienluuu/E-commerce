"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "productType",
        targetKey: "productType",
        as: "categoryData",
      });
      Product.belongsTo(models.Order, {
        foreignKey: "id",
        targetKey: "productId",
        as: "productData",
      });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      productType: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
