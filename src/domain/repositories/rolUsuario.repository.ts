import { RolUsuario } from '../entities/rolUsuario.entity';
import { Transaction } from 'sequelize';

export interface RolUsuarioRepository {
  createOrUpdate(item: RolUsuario, t?: Transaction): Promise<RolUsuario>;
  findAll(params: any): Promise<{ count: number; rows: RolUsuario[] }>;
  findOne?(params: any): Promise<RolUsuario | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
