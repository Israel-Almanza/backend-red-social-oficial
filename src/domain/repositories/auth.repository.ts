
import { Auth } from '../entities/auth.entity';
import { Transaction } from 'sequelize';

export interface AuthRepository {
  createOrUpdate(item: Auth, t?: Transaction): Promise<Auth>;
  findAll(params: any): Promise<{ count: number; rows: Auth[] }>;
  // findOne?(params: any): Promise<Auth | null>;
  // deleteItem?(id: number, t?: Transaction): Promise<number>;
}
