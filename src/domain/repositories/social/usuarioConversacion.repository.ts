
import { UsuarioConversacion } from '@/domain/entities/social/usuarioConversacion.entity';
import { Transaction } from 'sequelize';

export interface UsuarioConversacionRepository {
  createOrUpdate(item: UsuarioConversacion, t?: Transaction): Promise<UsuarioConversacion>;
  findAll(params: any): Promise<{ count: number; rows: UsuarioConversacion[] }>;
  findOne?(params: any): Promise<UsuarioConversacion | null>;
  deleteItem?(id: number, t?: Transaction): Promise<number>;
}
