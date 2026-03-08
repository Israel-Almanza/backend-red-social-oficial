import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

export class CrearClienteUseCase {
  constructor(private repo: ClienteRepository) {}

  execute(nombre: string, nit: string) {
    const cliente = new Cliente(0, nombre, nit);
    return this.repo.create(cliente);
  }
}