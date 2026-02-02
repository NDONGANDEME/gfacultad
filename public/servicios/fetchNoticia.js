import { Alerta } from "../utilidades/u_alertas";

export class fetchNoticia
{
    url = '/guniversidadfrontend/public/core/endpoint.php';

    // cargar las 5 noticias mas recientes
    static async cargarNoticiasRecientesDelBackend()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=noticias&action=listar5NoticiasRecientes`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 14. fetchNoticia]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta; 
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 19. fetchNoticia]`);
                return;
            }
        } catch(error) {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 23. fetchNoticia]. ${error}`);
            return;
        }
    }


    // cargar todas las noticias
    static async cargarTodasNoticiasDelBackend()
    {
        try
        {
            let solicitud = await fetch(`${url}?ruta=noticias&action=listarNoticias`);

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 36. fetchNoticia]');
            
            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta; 
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 41. fetchNoticia]`);
                return;
            }
        } catch(error)
        {
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 46. fetchNoticia]. ${error}`);
            return;
        }
    }
}