import { Entidad } from '../entities/entidad.entity';
import { Transaction } from 'sequelize';

export interface EntidadRepository {
  createOrUpdate(item: Entidad, t?: Transaction): Promise<Entidad>;
  findAll(params: any): Promise<{ count: number; rows: Entidad[] }>;
  findOne?(params: any): Promise<Entidad | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
