import { Parametro } from '../entities/parametro.entity';
import { Transaction } from 'sequelize';

export interface ParametroRepository {
  createOrUpdate(item: Parametro, t?: Transaction): Promise<Parametro>;
  findAll(params): Promise<{ count: number; rows: Parametro[] }>;
  // findAll(): Promise<Usuario[]>;
}
