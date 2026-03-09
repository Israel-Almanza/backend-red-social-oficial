import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Delete,
  Param,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';

import { UsuarioInteraccionService } from '@/application/services/social/usuarioInteraccion.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';


@Controller('social/likes')
export class UsuarioInteraccionController {

  constructor(
    private readonly usuarioInteraccionService: UsuarioInteraccionService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async likeUsuario(@Body() body: any, @Req() req: any) {
    try {
      const data = body;
      if (req?.user) {
        data.userCreated = req.user.idUsuario;
        data.usuarioOrigenId = req.user.idUsuario;
      }

      const respuesta = await this.usuarioInteraccionService.likeUsuario(data);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any) {
    try {
      datos.id = Number(id);
      const respuesta = await this.usuarioInteraccionService.actualizar(datos);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    try {
      const respuesta = await this.usuarioInteraccionService.eliminar(Number(id));
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @Get(':id')
  async mostrar(@Param('id') id: number) {
    try {
      const respuesta = await this.usuarioInteraccionService.findOne({ id: Number(id) });
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @UseGuards(JwtAuthGuard) 
  // , PermissionGuard)
  // @Permissions('usuarioInteraccion:listar')
  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.usuarioInteraccionService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }
}
