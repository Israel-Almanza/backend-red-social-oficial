import { Body, Controller, Get, Post,Req, Put, Delete, Param, Query, HttpException } from '@nestjs/common';
import { UsuarioService } from '@/application/services/usuario.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { AuthService } from '@/application/services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    // private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService
  ) { }

  @Post('login')
  async login(@Body() body: any, @Req() req: Request) {
    try {
      console.log('body ::: ', body)
      const respuesta = await this.authService.login(body.usuario, body.contrasena, req);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      console.log('print error ',error)
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }
  }

  /* @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any) {
    try {
      datos.id = id
      const respuesta = await this.usuarioService.actualizar(datos);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }

  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    try {
      const respuesta = await this.usuarioService.eliminar(id);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }

  }

  @Get(':id')
  async mostrar(@Param('id') id: number) {
    try {
      const respuesta = await this.usuarioService.findOne({id: id});
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }

  }

  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.usuarioService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error: any) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }
  } */
}
