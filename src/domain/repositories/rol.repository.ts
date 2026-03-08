import { Rol } from '../entities/rol.entity';
import { Transaction } from 'sequelize';

export interface RolRepository {
  createOrUpdate(item: Rol, t?: Transaction): Promise<Rol>;
  findAll(params: any): Promise<{ count: number; rows: Rol[] }>;
  findOne?(params: any): Promise<Rol | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
