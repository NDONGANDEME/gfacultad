import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchCarrera
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerCarrerasDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=carrera&accion=obtenerCarreras`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 15. fetchCarrera]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 20. fetchCarrera]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 24. fetchCarrera]. ${error}`);
            return;
        }
    }



    static async insertarCarreraEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=carrera&accion=insertarCarrera`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchCarrera]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchCarrera]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchCarrera]. ${error}`);
            return;
        }
    }



    static async actualizarCarreraEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=carrera&accion=actualizarCarrera`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchCarrera]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchCarrera]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchCarrera]. ${error}`);
            return;
        }
    }



    static async deshabilitarCarreraEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=carrera&accion=deshabilitarCarrera&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchCarrera]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchCarrera]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchCarrera]. ${error}`);
            return;
        }
    }
}