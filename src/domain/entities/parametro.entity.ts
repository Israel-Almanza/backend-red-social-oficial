export class Parametro {
  constructor(
    public id: string,
    public grupo: string,
    public codigo: string,
    public nombre: string,
    public descripcion: string | null,
  ) {}
}