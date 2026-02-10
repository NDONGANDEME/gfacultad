import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchMatricula
{
    url = '/guniversidadfrontend/public/core/endpoint.php';


    static async insertarMatriculaEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=matricula&accion=insertarMatricula`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 19. fetchMatricula]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 24. fetchMatricula]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 28. fetchMatricula]. ${error}`);
            return;
        }
    }



    static async actualizarMatriculaEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=matricula&accion=actualizarMatricula`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 46. fetchMatricula]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 51. fetchMatricula]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 55. fetchMatricula]. ${error}`);
            return;
        }
    }



    static async obtenerMatriculasDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=matricula&accion=obtenerMatriculas`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 68. fetchMatricula]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 73. fetchMatricula]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 77. fetchMatricula]. ${error}`);
            return;
        }
    }
}