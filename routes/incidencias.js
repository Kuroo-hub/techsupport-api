const express = require("express");
const router = express.Router();

//Importar funciones
const { registrarIncidencia, listarIncidencias} = require("../controllers/incidenciasController");

// funcion registrar incidencias
router.post("/", registrarIncidencia);

// Funcion de mostrar todas las incidencias 
router.get("/", listarIncidencias);

module.exports = router;