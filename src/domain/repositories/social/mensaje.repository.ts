import { Mensaje } from '@/domain/entities/social/mensaje.entity';
import { Transaction } from 'sequelize';

export interface MensajeRepository {
  createOrUpdate(item: Mensaje, t?: Transaction): Promise<Mensaje>;
  findAll(params: any): Promise<{ count: number; rows: Mensaje[] }>;
  findOne?(params: any): Promise<Mensaje | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
