// Este archivo es para crear funciones/metodos que podamos reciclar cuantas veces lo necesitemos

function validarPrioridad(prioridad){
    const prioridadNormalizada = prioridad.trim().toLowerCase();

    return prioridadNormalizada === "alta" || prioridadNormalizada === "media" || prioridadNormalizada === "baja";
}

module.exports = 
{
    validarPrioridad
};