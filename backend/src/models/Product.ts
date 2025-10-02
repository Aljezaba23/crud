import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // entero positivo
    autoIncrement: true,               // autoincremental
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'products', // nombre tabla
  sequelize               // conexión Sequelize
});

export default Product;

