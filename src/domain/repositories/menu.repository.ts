import { Menu } from '../entities/menu.entity';
import { Transaction } from 'sequelize';

export interface MenuRepository {
  createOrUpdate(item: Menu, t?: Transaction): Promise<Menu>;
  findAll(params: any): Promise<{ count: number; rows: Menu[] }>;
  findOne?(params: any): Promise<Menu | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
