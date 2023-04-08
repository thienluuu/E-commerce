"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Product, {
        foreignKey: "id",
        as: "productData",
      });
    }
  }
  Order.init(
    {
      date: DataTypes.STRING,
      statusId: DataTypes.STRING,
      productId: DataTypes.STRING,
      userId: DataTypes.STRING,
      productName: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
