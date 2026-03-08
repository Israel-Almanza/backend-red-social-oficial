import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConversacionModel } from '@/infrastructure/database/models/social/conversacion.model';
import { ConversacionRepository } from '../../../domain/repositories/social/conversacion.repository';
import { Conversacion } from '@/domain/entities/social/conversacion.entity';

import { GenericRepository } from '../../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../../lib/utils';
import { MensajeModel } from '@/infrastructure/database/models/social/mensaje.model';

@Injectable()
export class ConversacionRepositoryImpl implements ConversacionRepository {
  constructor(
    @InjectModel(ConversacionModel)
    private readonly conversacionModel: typeof ConversacionModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async findOne(params = {}): Promise<Conversacion> {
    const query: any = {};
    query.where = params;
    const result = await this.conversacionModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Conversacion,
    t?: Transaction,
  ): Promise<Conversacion> {
    return await this.genericRepo.createOrUpdate(item, this.conversacionModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.conversacionModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Conversacion[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    query.include = [
      {
        model: MensajeModel,
        as: 'mensajes',
      }
    ];

    const result = await this.conversacionModel.findAndCountAll(query);
    return toJSON(result);
  }
}
