import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchPago
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerPagosDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=pago&accion=obtenerPagos`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 15. fetchPago]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 20. fetchPago]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 24. fetchPago]. ${error}`);
            return;
        }
    }



    static async insertarPagoEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=pago&accion=insertarPago`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchPago]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchPago]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchPago]. ${error}`);
            return;
        }
    }



    static async actualizarPagoEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=pago&accion=actualizarPago`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchPago]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchPago]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchPago]. ${error}`);
            return;
        }
    }



    static async deshabilitarPagoEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=pago&accion=deshabilitarPago&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchPago]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchPago]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchPago]. ${error}`);
            return;
        }
    }
}