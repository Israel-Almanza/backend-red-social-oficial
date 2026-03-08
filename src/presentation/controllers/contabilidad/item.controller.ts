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

import { ItemService } from '@/application/services/contabilidad/item.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { JwtAuthGuard } from '../../middlewares/jwt-auth.guard';


@Controller('ctb/items')
export class ItemController {

  constructor(
    private readonly itemService: ItemService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() body: any, @Req() req: any) {
    try {
      const data = body;
      if (req?.user) {
        data.userCreated = req.user.idUsuario;
      }
      console.log('data ', data)

      const respuesta = await this.itemService.crear(data);
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
      const respuesta = await this.itemService.actualizar(datos);
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
      const respuesta = await this.itemService.eliminar(Number(id));
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
      const respuesta = await this.itemService.findOne({ id: Number(id) });
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
  // @Permissions('item:listar')
  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.itemService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }
}
