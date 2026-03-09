import { UsuarioInteraccion } from '../../entities/social/usuarioInteraccion.entity';
import { Transaction } from 'sequelize';

export interface UsuarioInteraccionRepository {
  createOrUpdate(item: UsuarioInteraccion, t?: Transaction): Promise<UsuarioInteraccion>;
  findAll(params: any): Promise<{ count: number; rows: UsuarioInteraccion[] }>;
  findOne?(params: any): Promise<UsuarioInteraccion | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
