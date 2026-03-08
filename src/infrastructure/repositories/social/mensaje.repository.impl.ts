import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MensajeModel } from '@/infrastructure/database/models/social/mensaje.model';
import { MensajeRepository } from '../../../domain/repositories/social/mensaje.repository';
import { Mensaje } from '@/domain/entities/social/mensaje.entity';
import { GenericRepository } from '../../database/generic.repository';
import { Op,Transaction } from 'sequelize';
import { toJSON, getQuery } from '../../lib/utils';
import { UsuarioModel } from '@/infrastructure/database/models/usuario.model';

@Injectable()
export class MensajeRepositoryImpl implements MensajeRepository {
  constructor(
    @InjectModel(MensajeModel)
    private readonly mensajeModel: typeof MensajeModel,

    private readonly genericRepo: GenericRepository,
  ) {}

  async findOne(params = {}): Promise<Mensaje> {
    const query: any = {};
    query.where = params;
    const result = await this.mensajeModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Mensaje,
    t?: Transaction,
  ): Promise<Mensaje> {
    return await this.genericRepo.createOrUpdate(item, this.mensajeModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.mensajeModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Mensaje[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    // Si se proporciona `userId`, comprueba si es un array o un valor único
    if (params?.remitenteId) {
      if (Array.isArray(params?.remitenteId)) {
          // Si `userId` es un array, usa `Op.in`
          query.where.senderId = {
              [Op.in]: params?.remitenteId
          };
      } else {
          // Si `userId` es un valor único, usa el valor directamente
          query.where.remitenteId = params?.remitenteId;
      }
    }
    if (params?.conversacionId) {
      if (Array.isArray(params?.conversacionId)) {
          // Si `userId` es un array, usa `Op.in`
          query.where.conversacionId = {
              [Op.in]: params?.conversationId
          };
      } else {
          // Si `userId` es un valor único, usa el valor directamente
          query.where.conversacionId = params?.conversacionId;
      }
    }

    /* query.include = [
      {
        model: UsuarioModel,
        as: 'usuarioCreador',
      }
    ]; */

    const result = await this.mensajeModel.findAndCountAll(query);
    return toJSON(result);
  }
}
