import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchFamiliar
{
    url = '/guniversidadfrontend/public/core/endpoint.php';


    static async insertarFamiliarEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=familiar&accion=insertarFamiliar`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 19. fetchFamiliar]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 24. fetchFamiliar]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 28. fetchFamiliar]. ${error}`);
            return;
        }
    }



    static async actualizarFamiliarEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=familiar&accion=actualizarFamiliar`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 46. fetchFamiliar]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 51. fetchFamiliar]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 55. fetchFamiliar]. ${error}`);
            return;
        }
    }
}