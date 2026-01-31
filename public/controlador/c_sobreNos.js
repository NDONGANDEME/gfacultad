import { u_utiles } from "../utilidades/u_utiles.js";

document.addEventListener('DOMContentLoaded', async function(){
    u_utiles.botonesNavegacion();

    await u_utiles.cargarArchivosImportadosHTML('Navegacion', '.importandoNavegacion');

    await u_utiles.cargarArchivosImportadosHTML('Footer', '.importandoFooter');
});