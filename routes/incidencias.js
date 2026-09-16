const express = require("express");
const router = express.Router();

//Importar funciones
const { registrarIncidencia, 
        listarIncidencias, 
        buscarIncidencia,
        cambiarEstado,
        eliminarIncidencia} = require("../controllers/incidenciasController");

// funcion registrar incidencias
router.post("/", registrarIncidencia);

// Funcion de mostrar todas las incidencias 
router.get("/", listarIncidencias);

// Buscar incidencia
router.get("/:id", buscarIncidencia);

// Cambiar Estado
router.put("/:id/estado", cambiarEstado);

// Eliminar incidencia
router.delete("/:id", eliminarIncidencia);

module.exports = router;