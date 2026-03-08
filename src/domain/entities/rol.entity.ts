export class Rol {
  constructor(
    public id: number,
    public idEntidad: string | null,
    public nombre: string,
    public descripcion: string | null,
    public estado: 'ACTIVO' | 'INACTIVO',
  ) {}
}
