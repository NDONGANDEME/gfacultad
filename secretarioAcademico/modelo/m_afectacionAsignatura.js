export class m_afectacionAsignatura
{
    constructor(idAfectacionAsignatura, idAsignatura, idEstudiante, estado)
    {
        this.idAfectacionAsignatura = idAfectacionAsignatura;
        this.idAsignatura = idAsignatura;
        this.idEstudiante = idEstudiante;
        this.estado = estado;
    }
}

/**
 * el estado pued ser: pendiente o superado */