import { Item } from '../../entities/item.entity';
import { Transaction } from 'sequelize';

export interface ItemRepository {
  createOrUpdate(item: Item, t?: Transaction): Promise<Item>;
  findAll(params: any): Promise<{ count: number; rows: Item[] }>;
  findOne?(params: any): Promise<Item | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
