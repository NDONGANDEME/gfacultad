import { Alerta } from "../../public/utilidades/u_alertas.js";

export class fetchCurso
{
    url = '/guniversidadfrontend/public/core/endpoint.php';



    static async obtenerCursosDeBDD()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=curso&accion=obtenerCursos`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 15. fetchCurso]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 20. fetchCurso]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 24. fetchCurso]. ${error}`);
            return;
        }
    }



    static async insertarCursoEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=curso&accion=insertarCurso`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 42. fetchCurso]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 47. fetchCurso]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 51. fetchCurso]. ${error}`);
            return;
        }
    }



    static async actualizarCursoEnBDD(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=curso&accion=actualizarCurso`,
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 69. fetchCurso]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 74. fetchCurso]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 78. fetchCurso]. ${error}`);
            return;
        }
    }



    static async deshabilitarCursoEnBDD(id)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=curso&accion=deshabilitarDepartamento&valor=${id}`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 90. fetchCurso]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.resultado;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 95. fetchCurso]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 99. fetchCurso]. ${error}`);
            return;
        }
    }
}