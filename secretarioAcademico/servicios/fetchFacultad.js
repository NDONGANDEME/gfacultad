import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchFacultad
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerFacultadesDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=facultad&accion=obtenerFacultades`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 15. fetchFacultad]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 20. fetchFacultad]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 24. fetchFacultad]. ${error}`);
            return;
        }
    }



    static async insertarFacultadEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=facultad&accion=insertarFacultad`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchFacultad]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchFacultad]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchFacultad]. ${error}`);
            return;
        }
    }



    static async actualizarFacultadEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=facultad&accion=actualizarFacultad`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchFacultad]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchFacultad]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchFacultad]. ${error}`);
            return;
        }
    }



    static async deshabilitarFacultadEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=facultad&accion=deshabilitarFacultad&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchFacultad]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchFacultad]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchFacultad]. ${error}`);
            return;
        }
    }
}