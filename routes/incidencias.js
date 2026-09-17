const express = require("express");
const router = express.Router();

//Importar funciones
const { registrarIncidencia, 
        listarIncidencias, 
        buscarIncidencia,
        cambiarEstado,
        eliminarIncidencia,
        obtenerEstadisticas,
        clasificarIncidencia} = require("../controllers/incidenciasController");

// funcion registrar incidencias
router.post("/", registrarIncidencia);

// Funcion de mostrar todas las incidencias 
router.get("/", listarIncidencias);

// Obtener estadisticas
router.get("/estadisticas", obtenerEstadisticas);

// Buscar incidencia
router.get("/:id", buscarIncidencia);

// Cambiar Estado
router.put("/:id/estado", cambiarEstado);

// Eliminar incidencia
router.delete("/:id", eliminarIncidencia);

//clasificar Incidencia
router.get("/:id/clasificacion", clasificarIncidencia);

module.exports = router;