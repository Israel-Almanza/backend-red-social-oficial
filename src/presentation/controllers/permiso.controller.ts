import { Body, Controller, Get, Post, Put, Req, Delete, Param, Query, HttpException, UseGuards } from '@nestjs/common';
import { PermisoService } from '@/application/services/permiso.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { PermissionGuard } from '../middlewares/permission.guard';
import { Permissions } from '../middlewares/decorators/permissions.decorator';

@Controller('system/permisos')
export class PermisoController {

  constructor(private readonly permisoService: PermisoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() body: any, @Req() req: any) {
    try {
      const data = body;
      data.userCreated = req.user.idUsuario;
      const respuesta = await this.permisoService.crear(data);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any) {
    try {
      datos.id = id;
      const respuesta = await this.permisoService.actualizar(datos);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    try {
      const respuesta = await this.permisoService.eliminar(id);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async mostrar(@Param('id') id: number) {
    try {
      const respuesta = await this.permisoService.findOne({ id });
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.permisoService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }
}
