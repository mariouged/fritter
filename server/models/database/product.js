'use strict';
const { DataTypes, Model } = require('sequelize');
const connection = require('../../config');

class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: true,
        len: [2, 255],
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      validate: {
        isDecimal: true,
      }
    }
  }, {
    sequelize: connection,
    modelName: 'Product',
  });

  module.exports = Product;