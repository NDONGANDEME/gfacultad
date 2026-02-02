import { u_utiles } from "../utilidades/u_utiles.js";
import { c_noticia } from "./c_noticia.js";

// funcion de redireccion para is a inicio de sesion
function irAIniciarSesion()
{
    document.querySelector('#btnBodyHeader').addEventListener('click', function() {
        window.location.href = '/guniversidadfrontend/public/template/html/iniciarSesion.html';
    });
}

async function existe(){
    const importandoNavegacion = document.querySelector('.importandoNavegacion');
    
    if(!importandoNavegacion) return;

    await u_utiles.cargarArchivosImportadosHTML('Footer', '.importandoFooter');
}



document.addEventListener('DOMContentLoaded', async function()
{
    u_utiles.botonesNavegacion();

    irAIniciarSesion();

    c_noticia.inicializar();

    existe();
});