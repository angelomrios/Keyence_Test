import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";

const tiempo = new Date();
let mes = tiempo.getMonth() + 1;
let dia = tiempo.getDate();
const ano = tiempo.getFullYear();
dia < 10 ? (dia = "0" + dia) : dia;
mes < 10 ? (mes = "0" + mes) : mes;
const fechaActual = ano + "-" + mes + "-" + dia;
const horaActual = tiempo.toLocaleTimeString();

const formularioEntrada = (req, res) => {
  res.render("asistencia/entrada", {
    pagina: "Entrada",
    usuario: {
      fecha: fechaActual,
      horaIn: horaActual,
    },
  });
};

const formularioSalida = (req, res) => {
  res.render("asistencia/salida", {
    pagina: "Salida",
    usuario: {
      fecha: fechaActual,
      horaOut: horaActual,
    },
  });
};

const registroEntrada = async (req, res) => {
  req.body.fecha = fechaActual;
  req.body.horaIn = horaActual;

  //Validaciones de campos suspendidas por error pendiente de resolver

  // await check("empleadx").notEmpty().withMessage("Registre su ID").run(req);
  // await check("empleadx")
  //   .isNumeric()
  //   .withMessage("Solo se aceptan números")
  //   .run(req);
  // await check("empleadx")
  //   .isLength({ max: 4 })
  //   .withMessage("Máximo 4 dígitos")
  //   .run(req);
  // await check("nombre").notEmpty().withMessage("Registre su nombre").run(req);
  // await check("nombre")
  //   .isString()
  //   .withMessage("Solo se aceptan letras")
  //   .run(req);
  // await check("nombre")
  //   .isLength({ min: 3 })
  //   .withMessage("Ingrese un nombre válido")
  //   .run(req);

  // let resultado = validationResult(req);

  // if (resultado.isEmpty()) {
  //   return res.render("asistencia/entrada", {
  //     pagina: "Entrada",
  //     errores: resultado.array(),
  //     usuario: {
  //       empleadx: req.body.empleadx,
  //       nombre: req.body.nombre,
  //       fecha: fechaActual,
  //       horaIn: req.body.horaIn,
  //     },
  //   });
  // }

  const { empleadx, nombre, fecha, horaIn } = req.body;

  // const registroExiste = await Usuario.findOne({ where: { empleadx, fecha } });
  // if (registroExiste) {
  //   return res.render("asistencia/entrada", {
  //     pagina: "Entrada",
  //     errores: [{ msg: "Ya registró su entrada" }],
  //     usuario: {
  //       empleadx: "",
  //       nombre: "",
  //       fecha: fechaActual,
  //       horaIn: horaActual,
  //     },
  //   });

  //   return;
  // }

  const usuarioCreado = await Usuario.create({
    empleadx,
    nombre,
    fecha,
    horaIn,
  });

  res.render({
    pagina: "Entrada",
    usuario: {
      empleadx: "",
      nombre: "",
      fecha: fechaActual,
      horaIn: horaActual,
    },
  });
};

const registroSalida = async (req, res) => {
  await check("empleadx").notEmpty().withMessage("Resgistre su ID").run(req);
  await check("empleadx")
    .isNumeric()
    .withMessage("Solo se aceptan números")
    .run(req);
  await check("empleadx")
    .isLength({ max: 4 })
    .withMessage("Máximo 4 dígitos")
    .run(req);
  await check("nombre").notEmpty().withMessage("Registre su nombre").run(req);
  await check("nombre")
    .isString()
    .withMessage("Solo se aceptan letras")
    .run(req);
  await check("nombre")
    .isLength({ min: 3 })
    .withMessage("Ingrese un nombre válido")
    .run(req);

  let resultado = validationResult(req);

  if (resultado.isEmpty()) {
    return res.render("asistencia/salida", {
      pagina: "Salida",
      errores: resultado.array(),
      usuario: {
        empleadx: req.body.empleadx,
        nombre: req.body.nombre,
        fecha: fechaActual,
        horaOut: req.body.horaOut,
      },
    });
  }

  const { empleadx, nombre, fecha, horaOut } = req.body;

  const registroExiste = await Usuario.findOne({ where: { empleadx, fecha } });
  if (registroExiste) {
    return res.render("asistencia/salida", {
      pagina: "Salida",
      errores: [{ msg: "Ya registró su salida" }],
      usuario: {
        empleadx: "",
        nombre: "",
        fecha: fechaActual,
        horaOut: horaActual,
      },
    });

    return;
  }

  await Usuario.create({
    empleadx,
    nombre,
    fecha,
    horaOut,
  });
};

export { formularioEntrada, formularioSalida, registroEntrada, registroSalida };
