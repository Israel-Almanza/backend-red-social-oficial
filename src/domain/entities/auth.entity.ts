export class Auth {
  constructor(
    // public readonly id: number,

    public ip?: string,
    public navegador?: string,
    public userAgent?: string,
    public token?: string,
    public idUsuario?: string,
    public idEntidad?: string,

    public userCreated?: string,

  ) { }
}
