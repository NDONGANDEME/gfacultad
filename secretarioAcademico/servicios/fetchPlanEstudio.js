import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchPlanEstudio
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerPlanesEstudiosDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=planEstudio&accion=obtenerPlanesEstudios`);

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



    static async insertarPlanEstudioEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=planEstudio&accion=insertarPlanEstudio`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchPlanEstudio]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchPlanEstudio]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchPlanEstudio]. ${error}`);
            return;
        }
    }



    static async actualizarPlanEstudioEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=planEstudio&accion=actualizarPlanEstudio`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchPlanEstudio]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchPlanEstudio]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchPlanEstudio]. ${error}`);
            return;
        }
    }



    static async deshabilitarPlanEstudioEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=planEstudio&accion=deshabilitarPlanEstudio&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchPlanEstudio]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchPlanEstudio]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchPlanEstudio]. ${error}`);
            return;
        }
    }
}