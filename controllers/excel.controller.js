import db from "../config/db.js";
import mysql from "mysql2/promise";
import excel from "exceljs";

async function obtenerDatosAsistencia() {
  console.log("obtenerdatosasistencia");
  const connection = await mysql.createConnection(db);
  const [rows] = await connection.execute(
    "SELECT empleadx, nombre, fecha, horaIn, horaOut FROM asistencia"
  );
  connection.end();
  return rows;
}

async function guardarEnExcel(datos) {
  console.log("guardardatosexcel");
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Asistencia");

  worksheet.addRow([
    "Employee ID",
    "Employee Name",
    "Date",
    "Punch In",
    "Punch Out",
  ]);

  datos.forEach((fila) => {
    worksheet.addRow([
      fila.empleadx,
      fila.nombre,
      fila.fecha,
      fila.horaIn,
      fila.horaOut,
    ]);
  });

  const filename = "asistencia.xlsx";
  await workbook.xlsx.writeFile(filename);
  console.log(`Los datos se han guardado correctamente en ${filename}`);
}

async function exportarDatosAsistencia() {
  try {
    console.log("iniciando exportacion");
    const datos = await obtenerDatosAsistencia();
    await guardarEnExcel(datos);
  } catch (error) {
    console.error("Error al exportar los datos:", error);
  }
}

export default exportarDatosAsistencia;
