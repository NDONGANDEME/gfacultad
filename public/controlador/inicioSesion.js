import { m_sesion } from "../modelo/m_sesion.js";

// funcion de redireccion para is a inicio de sesion
function irAInicio()
{
    document.querySelector('#enlaceInicio').addEventListener('click', function() {
        window.location.href = '/guniversidadfrontend/index.html';
    });
}



document.addEventListener('DOMContentLoaded', function()
{
    irAInicio();

    m_sesion.iniciarSesion();
});