import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClienteModel } from '../database/models/cliente.model';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class ClienteRepositoryImpl implements ClienteRepository {
  constructor(
    @InjectModel(ClienteModel)
    private readonly clienteModel: typeof ClienteModel
  ) {}

  async create(cliente: Cliente): Promise<Cliente> {
    const nuevo = await this.clienteModel.create({
      nombre: cliente.nombre,
      nit: cliente.nit,
    });

    return new Cliente(nuevo.id, nuevo.nombre, nuevo.nit);
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteModel.findAll();
    return clientes.map(c => new Cliente(c.id, c.nombre, c.nit));
  }
}