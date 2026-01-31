import { sesiones } from "../../public/core/sesiones.js";

document.addEventListener('DOMContentLoaded', function()
{
    // Verificar sesión antes de cargar el contenido
    sesiones.verificarExistenciaSesion();
});