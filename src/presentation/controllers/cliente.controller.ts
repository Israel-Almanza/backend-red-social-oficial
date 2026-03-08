import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearClienteUseCase } from '../../application/use-cases/crear-cliente.usecase';
import { ClienteRepositoryImpl } from '../../infrastructure/repositories/cliente.repository.impl';

@Controller('clientes')
export class ClienteController {
  private useCase: CrearClienteUseCase;

  constructor(repo: ClienteRepositoryImpl) {
    this.useCase = new CrearClienteUseCase(repo);
  }

  @Post()
  crear(@Body() body: any) {
    return this.useCase.execute(body.nombre, body.nit);
  }

  @Get()
  listar() {
    return this.useCase['repo'].findAll();
  }
}