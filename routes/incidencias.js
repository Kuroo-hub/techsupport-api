const express = require("express");
const router = express.Router();

//Importar funciones
const { registrarIncidencia, listarIncidencias, buscarIncidencias} = require("../controllers/incidenciasController");

// funcion registrar incidencias
router.post("/", registrarIncidencia);

// Funcion de mostrar todas las incidencias 
router.get("/", listarIncidencias);

//Funcion buscar incidencias dado su id
router.get("/:id", buscarIncidencias);

module.exports = router;