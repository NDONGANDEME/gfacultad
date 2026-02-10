export class m_usuario
{
    constructor(idUsuario, login, contraseña, rol, estado)
    {
        this.idUsuario = idUsuario || null;
        this.login = login || null;
        this.contraseña = contraseña || null;
        this.rol = rol || null;
        this.estado = estado || null;
    }
}