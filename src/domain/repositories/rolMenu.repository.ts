import { RolMenu } from '../entities/rolMenu.entity';
import { Transaction } from 'sequelize';

export interface RolMenuRepository {
  createOrUpdate(item: RolMenu, t?: Transaction): Promise<RolMenu>;
  findAll(params: any): Promise<{ count: number; rows: RolMenu[] }>;
  findOne?(params: any): Promise<RolMenu | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
