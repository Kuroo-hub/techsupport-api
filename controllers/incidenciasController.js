const incidencias = require("../data/incidencias");
const {validarPrioridad} = require("../utils/helpers");

// Registro de las incidencias
function registrarIncidencia(req, res)
{
    try
    {
        // Objeto para extraer las propiedades de req.body y guardarlas en variables individuales. Se le llama desestructuracion
        const {empleado, area, descripcion, prioridad} = req.body;

        // Validacion de los campos
        if(!empleado || !area || !descripcion || !prioridad)
            {
                return res.status(400).json({error: "Porfavor llenar todos los campos."});
            }
        
        if(empleado.trim() === "" || area.trim() === "" || descripcion.trim() === "" || prioridad.trim() === "")
            {
                return res.status(400).json({error: "Porfavor llenar todos los campos."});
            }
        
        // Validacion y Normalizacion de la prioridad
        if(!validarPrioridad(prioridad))
            {
                return res.status(400).json({error: "La prioirdad solo puede ser Alta, Media o Baja."});
            }

        // Registramos el nuevo objeto con los campos que ya teniamos y le agregamos el id junto con el estado.
        const nuevaIncidencia = 
        {
            id: incidencias.length + 1,
            empleado: empleado.trim(),
            area: area.trim(),
            descripcion: descripcion.trim(),
            prioridad: prioridad,
            estado: "pendiente"
        };

        // Agregamos el objeto al arreglo
        incidencias.push(nuevaIncidencia);

        return res.status(201).json({
            mensaje: "Se registro correctamente la incidencia",
            incidencia: nuevaIncidencia
        })
    }catch(error)
    {
        res.status(500).json({error: "Error al registrar la incidencia."});
    }
}

function listarIncidencias(req, res)
{
    try
    {
        if(incidencias.length === 0)
            {
                return res.status(200).json({mensaje: "No hay incidencias registradas"});
            }
        return res.status(200).json(incidencias);
    }catch(error)
    {
        res.status(500).json
        ({
            error: "Ocurrio un error al mostrar la lista"
        });
    }
}

function buscarIncidencia(req, res)
{
    try
    {
        const {id} = req.params;

        const incidenciaEncontrada = incidencias.find(
            incidencia => incidencia.id === Number(id)
        );

        if(!incidenciaEncontrada)
            {
                return res.status(404).json({error: "Incidencia no encontrada"});
            }
        
        return res.status(200).json(incidenciaEncontrada);
    }catch(error)
    {
        res.status(500).json({error: "Problemas con el servidor"});
    }
}

function cambiarEstado(req, res)
{
    try
    {
        const {id} = req.params;
        const {estado} = req.body;

        //Normalizamos el estado
        const estadoNormalizado = estado.trim().toLowerCase();

        const incidenciaEncontrada = incidencias.find(
            incidencia => incidencia.id === Number(id)
        );

        if(!incidenciaEncontrada)
            {
                return res.status(404).json({error: "Incidencia no encontrada"});
            }
        
        switch (estadoNormalizado) {
            case "pendiente":
                incidenciaEncontrada.estado = "Pendiente";
                break;
            case "en proceso":
                incidenciaEncontrada.estado = "En Proceso";
                break;
            case "resuelta":
                incidenciaEncontrada.estado = "Resuelta";
                break;
            case "cancelada":
                incidenciaEncontrada.estado = "Cancelada";
                break; 
            default:
                return res.status(400).json({error: "Estado no valido"});      
        }

        return res.status(200).json({
            mensaje: "Estado cambiado correctamente.",
            incidencia: incidenciaEncontrada
        });
    }catch(error)
    {
        res.status(500).json({error: "Problemas con el servidor"});
    }
}

function eliminarIncidencia(req, res)
{
    try
    {
        const {id} = req.params;

        const indiceIncidencia = incidencias.findIndex(
            incidencia => incidencia.id === Number(id)
        );

        if (indiceIncidencia === -1)
        {
            return res.status(404).json({
                error: "Incidencia no encontrada"
            });
        }
        
        incidencias.splice(indiceIncidencia, 1);

        return res.status(200).json({
            mensaje: "Se elimino la incidencia correctamente"
        });

    }catch(error)
    {
        res.status(500).json({error: "Problemas con el servidor"});
    }
}

module.exports =
{
    registrarIncidencia,
    listarIncidencias,
    buscarIncidencia,
    cambiarEstado,
    eliminarIncidencia
};