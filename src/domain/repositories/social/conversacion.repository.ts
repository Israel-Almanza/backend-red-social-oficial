
import { Conversacion } from '@/domain/entities/social/conversacion.entity';
import { Transaction } from 'sequelize';

export interface ConversacionRepository {
  createOrUpdate(item: Conversacion, t?: Transaction): Promise<Conversacion>;
  findAll(params: any): Promise<{ count: number; rows: Conversacion[] }>;
  findOne?(params: any): Promise<Conversacion | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
