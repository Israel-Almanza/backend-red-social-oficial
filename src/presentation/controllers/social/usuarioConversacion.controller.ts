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

import { UsuarioConversacionService } from '@/application/services/social/usuarioConversacion.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';


@Controller('social/usuario-conversacion')
export class UsuarioConversacionController {

  constructor(
    private readonly usuarioConversacionService: UsuarioConversacionService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() body: any, @Req() req: any) {
    try {
      const data = body;
      if (req?.user) {
        data.userCreated = req.user.idUsuario;
      }

      const respuesta = await this.usuarioConversacionService.createOrUpdate(data);
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
      const respuesta = await this.usuarioConversacionService.createOrUpdate(datos);
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
      const respuesta = await this.usuarioConversacionService.eliminar(Number(id));
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
      const respuesta = await this.usuarioConversacionService.findOne({ id: Number(id) });
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
  // @Permissions('usuarioConversacion:listar')
  @Get()
  async listar(@Query() params: any, @Req() req: any) {
    try {
      // console.log('req usuario :::: ', req.user)
      // si es admin ver todas las conversaciones
      params.usuarioId = req.user.idUsuario; 
      const respuesta = await this.usuarioConversacionService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }
}
