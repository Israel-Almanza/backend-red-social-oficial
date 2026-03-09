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


import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';
import { UsuarioService } from '@/application/services/usuario.service';


@Controller('social/usuarios')
export class socialUsuarioController {

  constructor(
    private readonly usuarioService: UsuarioService
    // usuarioService
  ) {}

 /* @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() body: any, @Req() req: any) {
    try {
      const data = body;
      if (req?.user) {
        data.userCreated = req.user.idUsuario;
      }

      const respuesta = await this.usuarioService.createOrUpdate(data);
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
      const respuesta = await this.usuarioService.createOrUpdate(datos);
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
      const respuesta = await this.usuarioService.eliminar(Number(id));
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }*/

  @Get(':id')
  async mostrar(@Param('id') id: number) {
    try {
      const respuesta = await this.usuarioService.findOne({ id: Number(id) });
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
  // @Permissions('mensaje:listar')
  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.usuarioService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }
}
