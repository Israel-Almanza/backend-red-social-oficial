import { Usuario } from '../entities/usuario.entity';
import { Transaction } from 'sequelize';

export interface UsuarioRepository {
  createOrUpdate(item: Usuario, t?: Transaction): Promise<Usuario>;
  findAll(params): Promise<{ count: number; rows: Usuario[] }>;
  // findAll(): Promise<Usuario[]>;
}
