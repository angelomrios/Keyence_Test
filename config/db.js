import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const db = new Sequelize("keyence_asistencia", "keyence", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: true,
  },
  pool: {
    max: 200,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false,
});

export default db;
