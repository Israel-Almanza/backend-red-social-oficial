import { Permiso } from '../entities/permiso.entity';
import { Transaction } from 'sequelize';

export interface PermisoRepository {
  createOrUpdate(item: Permiso, t?: Transaction): Promise<Permiso>;
  findAll(params: any): Promise<{ count: number; rows: Permiso[] }>;
  findOne?(params: any): Promise<Permiso | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
