export class UsuarioInteraccion {
  constructor(
    public id: number,
    public usuarioId: number,
    public usuarioOrigenId: number,
    public usuarioDestinoId: number,
    public conversacionId: number,
    public tipo: string,
  ) { }
}
