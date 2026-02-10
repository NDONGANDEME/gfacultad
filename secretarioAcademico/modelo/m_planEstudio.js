export class m_planEstudio
{
    constructor(idPlanEstudio, nombre, idCarrera, fechaElaboracion, periodoPlanEstudio)
    {
        this.idPlanEstudio = idPlanEstudio || null;
        this.nombre = nombre || null;
        this.idCarrera = idCarrera || null;
        this.fechaElaboracion = fechaElaboracion || null;
        this.periodoPlanEstudio = periodoPlanEstudio || null;
    }
}