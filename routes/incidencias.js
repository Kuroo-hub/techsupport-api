const express = require("express");
const router = express.Router();

//Importar funciones
const { registrarIncidencia, listarIncidencias, buscarIncidencias, cambiarEstadoIncidencia, eliminarIncidencia,obtenerEstadisticas,clasificarIncidencia} = require("../controllers/incidenciasController");

// funcion registrar incidencias
router.post("/", registrarIncidencia);

// Funcion de mostrar todas las incidencias 
router.get("/", listarIncidencias);

// funcion de obtener estadisticas
router.get("/estadisticas", obtenerEstadisticas);

//Funcion buscar incidencias dado su id
router.get("/:id", buscarIncidencias);

// funcion de clasificacion por incidencia 
router.get("/:id/clasificacion", clasificarIncidencia);

//Funcion cambiar estado de una incidencia
router.put("/:id/estado", cambiarEstadoIncidencia);

//Funcion eliminar una incidencia
router.delete("/:id", eliminarIncidencia);

module.exports = router;