import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchDepartamento
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerDepartamentosDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=departamento&accion=obtenerDepartamentos`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 15. fetchDepartamento]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 20. fetchDepartamento]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 24. fetchDepartamento]. ${error}`);
            return;
        }
    }



    static async insertarDepartamentoEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=departamento&accion=insertarDepartamento`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchDepartamento]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchDepartamento]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchDepartamento]. ${error}`);
            return;
        }
    }



    static async actualizarDepartamentoEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=departamento&accion=actualizarDepartamento`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchDepartamento]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchDepartamento]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchDepartamento]. ${error}`);
            return;
        }
    }



    static async deshabilitarDepartamentoEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=departamento&accion=deshabilitarDepartamento&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchDepartamento]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchDepartamento]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchDepartamento]. ${error}`);
            return;
        }
    }
}