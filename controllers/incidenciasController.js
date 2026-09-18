const incidencias = require("../data/incidencias");
const { validarPrioridad } = require("../utils/helpers");

// Declaramos el contador global fuera de la funcion para llevar el control unico de los IDs
let idContador = 0;

// Registro de las incidencias
function registrarIncidencia(req, res) {
    try {
        // Esta parte de aca, para que no se confundan es como crear las variables una por una, este "metodo" se llama destructuring
        const { empleado, area, descripcion, prioridad } = req.body;

        // Validacion de los campos
        if (!empleado || !area || !descripcion || !prioridad) {
            return res.status(400).json({ error: "Porfavor llenar todos los campos." });
        }

        if (empleado.trim() === "" || area.trim() === "" || descripcion.trim() === "" || prioridad.trim() === "") {
            return res.status(400).json({ error: "Porfavor llenar todos los campos." });
        }

        // Validacion y Normalizacion de la prioridad
        if (!validarPrioridad(prioridad)) {
            return res.status(400).json({ error: "La prioridad solo puede ser Alta, Media o Baja." });
        }

        // Incrementamos el contador para garantizar un ID unico e irrepetible
        idContador++;
        // Registramos el nuevo objeto y le agregamos el id junto con el estado.
        const nuevaIncidencia = {
            id: idContador,
            empleado: empleado.trim().toUpperCase(),
            area: area.trim(),
            descripcion: descripcion.trim(),
            prioridad: prioridad,
            estado: "pendiente",
            tamaño: empleado.trim().length
        };

        // Agregamos el objeto al arreglo
        incidencias.push(nuevaIncidencia);

        return res.status(201).json({
            mensaje: "Se registro correctamente la incidencia",
            incidencia: nuevaIncidencia
        });
    } catch (error) {
        return res.status(500).json({ error: "Error al registrar la incidencia." });
    }
}

function listarIncidencias(req, res) {
    try {
        if (incidencias.length === 0) {
            return res.status(200).json({ mensaje: "No hay incidencias registradas" });
        }
        return res.status(200).json(incidencias);
    } catch (error) {
        res.status(500).json
            ({
                error: "Ocurrio un error al mostrar la lista"
            });
    }
}

function buscarIncidencias(req, res) {
    try {
        //obtener el id q venga de la url y parseInt para convertirlo a numero
        const id = parseInt(req.params.id);

        //find() para buscar la incidencia uno por uno dentro del arreglo
        const incidencia = incidencias.find(incidencia => incidencia.id === id);

        if (!incidencia) {
            return res.status(404).json({
                error: "No se encontro la incidencia"
            });
        }

        return res.status(200).json(incidencia);
    } catch (error) {
        res.status(500).json({
            error: "Ocurrio un error al buscar la incidencia"
        });
    }
}

function buscarPorEstado(req, res) {
    try {
        //obtener el id q venga de la url y parseInt para convertirlo a numero
        const estado = req.params.estado;
        const incidenciaFiltrada = [];
        //filter() para filtrar por estado
        //const incidencia = incidencias.filter(incidencia => incidencia.estado.toLowerCase() === estado.toLowerCase());

        for(const incidencia of incidencias)
            {
                if(estado.toLowerCase() === incidencia.estado.toLowerCase())
                    {
                        incidenciaFiltrada.push(incidencia)
                    }
            }
        
        if(incidenciaFiltrada.length === 0)
            {
                return res.status(404).json
                ({
                    error: "No se encontro ninguna incidencia."
                });
            }
        // if (!incidencia) {
        //     return res.status(404).json({
        //         error: "No se encontro la incidencia"
        //     });
        // }

        return res.status(200).json(incidenciaFiltrada);
    } catch (error) {
        res.status(500).json({
            error: "Ocurrio un error al buscar la incidencia"
        });
    }
}

function cambiarEstadoIncidencia(req, res) {
    try {
        //obtener el id q venga de la url y parseInt para convertirlo a numero
        const id = parseInt(req.params.id);
        const { estado } = req.body;

        const incidencia = incidencias.find(incidencia => incidencia.id === id);

        if (!incidencia) {
            return res.status(404).json({
                error: "No se encontro la incidencia"
            });
        }
        if (!estado || estado.trim() === "") {
            return res.status(400).json({
                error: "Porfavor llenar el estado"
            });
        }
        const estadoNormalizado = estado.trim().toLowerCase();
        switch (estadoNormalizado) {
            case "pendiente":
                incidencia.estado = "pendiente";
                break;
            case "en proceso":
                incidencia.estado = "en proceso";
                break;
            case "resuelta":
                incidencia.estado = "resuelta";
                break;
            case "cancelada":
                incidencia.estado = "cancelada";
                break;
            default:
                return res.status(400).json({
                    error: "El estado solo puede ser pendiente, en proceso, resuelta o cancelada."
                });
        }
        return res.status(200).json({
            mensaje: "Se cambio el estado de la incidencia",
            incidencia: incidencia
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Ocurrio un error al cambiar el estado de la incidencia"
        });
    }
}
function eliminarIncidencia(req, res) {
    try {
        const id = parseInt(req.params.id);

        const indice = incidencias.findIndex(incidencia => incidencia.id === id);

        if (indice === -1) {
            return res.status(404).json({
                error: "No se encontro la incidencia"
            });
        }

        const incidenciaEliminada = incidencias.splice(indice, 1);

        return res.status(200).json({
            mensaje: "Se elimino correctamente la incidencia",
            incidencia: incidenciaEliminada[0]
        });
        }
    catch (error) {
        res.status(500).json({
            error: "Ocurrio un error al eliminar la incidencia"
        });
    }
}
function obtenerEstadisticas(req, res) {
    try {
        const estadisticas = incidencias.reduce((acc, incidencia) => {
            acc.totalIncidencias++;

            if (incidencia.estado === "pendiente") acc.pendientes++;
            else if (incidencia.estado === "en proceso") acc.enProceso++;
            else if (incidencia.estado === "resuelta") acc.resueltas++;
            else if (incidencia.estado === "cancelada") acc.canceladas++;

            return acc;
        }, {
            totalIncidencias: 0,
            pendientes: 0,
            enProceso: 0,
            resueltas: 0,
            canceladas: 0
        });

        return res.status(200).json(estadisticas);
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrió un error al obtener las estadísticas"
        });
    }
}
function clasificarIncidencia(req, res) {
    try {
        const id = parseInt(req.params.id);
        const incidencia = incidencias.find(i => i.id === id);

        if (!incidencia) {
            return res.status(404).json({
                error: "No se encontro la incidencia"
            });
        }

        let clasificacion = "";
        const prioridadNormalizada = incidencia.prioridad.trim().toLowerCase();
        switch (prioridadNormalizada) {
            case "alta":
                clasificacion = "Crítica";
                break;
            case "media":
                clasificacion = "Importante";
                break;
            case "baja":
                clasificacion = "Normal";
                break;
            default:
                clasificacion = "Sin clasificar";
                break;
        }
        return res.status(200).json({
            id: incidencia.id,
            clasificacion: clasificacion
        });
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrio un error al obtener la clasificacion"
        });
    }
}

module.exports = { 
    registrarIncidencia, 
    listarIncidencias, 
    buscarIncidencias, 
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia,
    buscarPorEstado
};