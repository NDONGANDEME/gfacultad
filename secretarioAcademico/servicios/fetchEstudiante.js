import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchEstudiante
{
    url = '/guniversidadfrontend/public/core/endpoint.php';


    static async insertarEstudianteEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=estudiante&accion=insertarEstudiante`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 19. fetchEstudiante]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 24. fetchEstudiante]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 28. fetchEstudiante]. ${error}`);
            return;
        }
    }



    static async actualizarEstudianteEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=estudiante&accion=actualizarEstudiante`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 46. fetchEstudiante]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 51. fetchEstudiante]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 55. fetchEstudiante]. ${error}`);
            return;
        }
    }



    static async obtenerEstudiantesDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=estudiante&accion=obtenerEstudiantes`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 68. fetchEstudiante]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 73. fetchEstudiante]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 77. fetchEstudiante]. ${error}`);
            return;
        }
    }
}