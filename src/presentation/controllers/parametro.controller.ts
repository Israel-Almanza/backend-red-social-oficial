import { Body, Controller, Get, Post, Put, Delete, Param, Query, HttpException } from '@nestjs/common';
import { ParametroService } from '@/application/services/parametro.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';

@Controller('system/parametros')
export class ParametroController {

  constructor(private readonly parametroService: ParametroService) { }

  @Post()
  async crear(@Body() body: any) {
    try {
      const respuesta = await this.parametroService.crear(body);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }
  }

  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any) {
    try {
      datos.id = id
      const respuesta = await this.parametroService.actualizar(datos);
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
      const respuesta = await this.parametroService.eliminar(id);
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
      const respuesta = await this.parametroService.findOne({id: id});
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
      const respuesta = await this.parametroService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error: any) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }
  }
}
