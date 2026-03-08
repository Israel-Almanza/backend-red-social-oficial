export class Permiso {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public tipo: string,
    public estado: 'ACTIVO' | 'INACTIVO',
  ) {}
}
