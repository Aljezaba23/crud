import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); // carga variables de .env

const sequelize = new Sequelize(
  process.env.DB_NAME!,       // nombre DB
  process.env.DB_USER!,       // usuario
  process.env.DB_PASS!,       // password (puede estar vacío)
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',         // estamos usando MySQL
    logging: false            // desactiva logs SQL en consola
  }
);

export default sequelize;
