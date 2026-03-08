export class Respuesta {
  constructor(
    public mensaje: string,
    public finalizado: boolean,
    public datos: any = null,
    public extras: any = null,
  ) {}
}
