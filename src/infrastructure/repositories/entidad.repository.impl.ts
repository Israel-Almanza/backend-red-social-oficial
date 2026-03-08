import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntidadModel } from '../database/models/entidad.model';
import { EntidadRepository } from '../../domain/repositories/entidad.repository';
import { Entidad } from '../../domain/entities/entidad.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class EntidadRepositoryImpl implements EntidadRepository {
  constructor(
    @InjectModel(EntidadModel)
    private readonly entidadModel: typeof EntidadModel,

    private readonly genericRepo: GenericRepository,
  ) {}

  async findOne(params = {}): Promise<Entidad> {
    const query: any = {};
    query.where = params;
    const result = await this.entidadModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Entidad,
    t?: Transaction,
  ): Promise<Entidad> {
    return await this.genericRepo.createOrUpdate(item, this.entidadModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.entidadModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Entidad[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.entidadModel.findAndCountAll(query);
    return toJSON(result);
  }
}
