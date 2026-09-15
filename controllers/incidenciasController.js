const incidencias = require("../data/incidencias");
const {validarPrioridad} = require("../utils/helpers");

// Registro de las incidencias
function registrarIncidencia(req, res)
{
    try
    {
        // Esta parte de aca, para que no se confundan es como crear las variables una por una, este "metodo" se llama destructuring
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
                res.status(400).json({error: "La prioirdad solo puede ser Alta, Media o Baja."})
            }

        // Registramos el nuevo objeto y le agregamos el id junto con el estado.
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

module.exports =
{
    registrarIncidencia,
    listarIncidencias
};