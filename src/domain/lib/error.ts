
export class ErrorApp extends Error {
  public httpCode: number;
  public codigoError: number;
  public log: boolean;

  constructor(
    errorMessage: string,
    httpCode: number = 400,
    name: string = 'ErrorAplicacion',
    log: boolean = false,
    errorCode: number = 1,
  ) {
    super(errorMessage);

    this.name = name;
    this.message = errorMessage || 'Ha ocurrido un error';
    this.codigoError = errorCode || 0;
    this.httpCode = httpCode;
    this.log = log;

    // Mantener la stack original
    this.stack = new Error(errorMessage).stack;

    if (log) {
      this.guardarLogs();
    }
  }

  async guardarLogs() {
    switch (this.httpCode) {
      case 400:
        // Aquí podrías integrar cualquier logger
        // logs.warning(this.message, this.name, this.httpCode);
        break;
      case 500:
        // logs.error(this.message, this.name, ` ${this.httpCode} ${this.stack}`);
        break;
    }
  }
}
