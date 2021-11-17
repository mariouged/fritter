'use strict';
import { DataTypes, Model } from 'sequelize';
import connection from '../../config';

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
    validate: {
      isUUID: {
        args: 4,
        msg: 'The ID must be a UUID4 string.',
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true,
      len: {
        args: [2, 255],
        msg: 'The name must contain between 2 and 100 characters.',
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'The description cannot be empty.',
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    validate: {
      isDecimal: {
        args: true,
        msg: 'The price must be a decimal.',
      },
      min: {
        args: 0.01,
        msg: 'The price must be higher than 0.00.',
      },
      max: {
        args: 9999999999.99,
        msg: 'The price should be less than 9999999999.99.',
      }
    }
  }
}, {
  sequelize: connection,
  modelName: 'Product',
  paranoid: true,
  tableName: 'Products'
});

export default Product;