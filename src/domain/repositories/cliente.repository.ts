import { Cliente } from '../entities/cliente.entity';

export interface ClienteRepository {
  create(cliente: Cliente): Promise<Cliente>;
  findAll(): Promise<Cliente[]>;
}