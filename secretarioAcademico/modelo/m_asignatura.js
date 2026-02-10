export class m_asignatura
{
    constructor(idAsignatura, nombreAsignatura, creditos, idCurso, idCarrera, idSemestre)
    {
        this.idAsignatura = idAsignatura || null;
        this.nombreAsignatura = nombreAsignatura || null;
        this.creditos = creditos || null;
        this.idCurso = idCurso || null;
        this.idCarrera = idCarrera || null;
        this.idSemestre = idSemestre || null;
    }
}