export class fetchSesion
{
    url = '/guniversidadfrontend/public/core/endpoint.php';

    // metodo que solicita verificar la contraseña y el correo/nombre de usuario pasados como parametros
    static async verificarCorreoONombreYContraseñaEnBackend(objeto)
    {
        try {
            let solicitud = await fetch(`${url}?ruta=sesion&action=verificarNombreUsuarioYContraseña`,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(objeto)
                }
            );

            if (!solicitud.ok) Alerta.error('Error', 'Fallo en la solicitud. [linea 17. fetchNoticia]');

            let respuesta = await solicitud.json();
            if(respuesta.estado == 'exito') return respuesta.dato;
            else {
                Alerta.error('Error', `${respuesta.mensaje}. [linea 22. fetchSesion]`);
                return;
            }
        } catch(error){
            Alerta.error('Error', `No se ha realizado la solicitud. [linea 26. fetchSesion]. ${error}`);
            return;
        }
    }
}