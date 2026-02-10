import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchUsuario
{
    url = '/guniversidadfrontend/public/core/endpoint.php';


    static async insertarUsuarioEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=usuario&accion=insertarUsuario`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 19. fetchUsuario]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 24. fetchUsuario]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 28. fetchUsuario]. ${error}`);
            return;
        }
    }



    static async actualizarUsuarioEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=usuario&accion=actualizarUsuario`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 46. fetchUsuario]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 51. fetchUsuario]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 55. fetchUsuario]. ${error}`);
            return;
        }
    }
}