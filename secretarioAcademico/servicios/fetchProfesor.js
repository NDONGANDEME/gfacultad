import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchProfesor
{
    url = '/guniversidadfrontend/public/core/endpoint.php';


    static async insertarProfesorEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=profesor&accion=insertarProfesor`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 19. fetchProfesor]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 24. fetchProfesor]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 28. fetchProfesor]. ${error}`);
            return;
        }
    }



    static async actualizarProfesorEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=profesor&accion=actualizarProfesor`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 46. fetchProfesor]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 51. fetchProfesor]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 55. fetchProfesor]. ${error}`);
            return;
        }
    }



    static async obtenerProfesoresDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=profesor&accion=obtenerProfesores`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 68. fetchProfesor]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 73. fetchProfesor]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 77. fetchProfesor]. ${error}`);
            return;
        }
    }
}