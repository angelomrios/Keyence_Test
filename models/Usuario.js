import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Usuario = db.define("asistencia", {
  empleadx: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horaIn: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  horaOut: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});

export default Usuario;
