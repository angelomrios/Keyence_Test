import express from "express";
import db from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

try {
  await db.authenticate();
  db.sync();
} catch (error) {
  console.log(error);
}

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/asistencia", usuarioRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
