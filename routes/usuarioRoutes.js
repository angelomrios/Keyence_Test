import express from "express";
import {
  formularioEntrada,
  formularioSalida,
  registroEntrada,
  registroSalida,
} from "../controllers/usuario.controller.js";
import exportarDatosAsistencia from "../controllers/excel.controller.js";

const router = express.Router();

router.get("/entrada", formularioEntrada);
router.post("/entrada", registroEntrada);

router.get("/salida", formularioSalida);
router.post("/salida", registroSalida);

router.get("/exportar", exportarDatosAsistencia);

export default router;
