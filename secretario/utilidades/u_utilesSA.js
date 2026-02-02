import { m_sesion } from "../../public/modelo/m_sesion.js";
import { u_utiles } from "../../public/utilidades/u_utiles.js";

export class u_utilesSA
{
    static botonesNavegacionWrapper(){
        // sentencia para ir al tablero
        $(document).ready( () =>  $('.tablero').click( () => u_utiles.redirigirA(null, '/guniversidadfrontend/secretario/index.html') ) );

        // sentencia para ir al submodulo de estudiantes
        $(document).ready( () =>  $('.estudiantes').click( () => u_utiles.redirigirA(null, '/guniversidadfrontend/secretario/template/html/subEstudiante.html') ) );

        // sentencia para cerrar la sesion
        $(document).ready( () =>  $('.cerrarSesion').click( () => m_sesion.cerrarSesion() ) );
    }


    // funcion que se encarga de cargar los archivos HTML importados
    static async cargarArchivosImportadosHTML(ruta, contendorImportar)
    { 
        try{
            let respuesta = await fetch(`/guniversidadfrontend/secretario/include/${ruta}.html`);
            if(!respuesta.ok) throw new Error(`Error al cargar ${ruta}`);
            const html = await respuesta.text();
            document.querySelector(contendorImportar).innerHTML = html;
            u_utilesSA.botonesNavegacionWrapper();
        } catch(error){
            Alerta.error('Error', `Fallo al hacer fetch [linea 28. u_utilesSA]: ${error}`);
        }
    }
}