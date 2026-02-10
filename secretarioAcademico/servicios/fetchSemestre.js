import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchSemestre
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerSemestresDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=semestre&accion=obtenerSemestres`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 15. fetchSemestre]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 20. fetchSemestre]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 24. fetchSemestre]. ${error}`);
            return;
        }
    }



    static async insertarSemestreEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=semestre&accion=insertarSemestre`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchSemestre]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchSemestre]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchSemestre]. ${error}`);
            return;
        }
    }



    static async actualizarSemestreEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=semestre&accion=actualizarSemestre`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchSemestre]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchSemestre]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchSemestre]. ${error}`);
            return;
        }
    }



    static async deshabilitarSemestreEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=semestre&accion=deshabilitarSemestre&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchSemestre]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchSemestre]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchSemestre]. ${error}`);
            return;
        }
    }
}