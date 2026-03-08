import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ParametroModel } from '../database/models/parametro.model';
import { ParametroRepository } from '../../domain/repositories/parametro.repository';
import { Parametro } from '../../domain/entities/parametro.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class ParametroRepositoryImpl implements ParametroRepository {
  constructor(
    @InjectModel(ParametroModel)
    private readonly parametroModel: typeof ParametroModel,

    private readonly genericRepo: GenericRepository, // ✅ inyectado
  ) {}

  async findOne(params= {} ): Promise<Parametro> {
    const query: any = {};
    query.where = params;
    const result = await this.parametroModel.findOne(query);
    return result.toJSON();
  }

  async createOrUpdate(item: Parametro , t?: Transaction ): Promise<Parametro> {
    return await this.genericRepo.createOrUpdate(item,this.parametroModel,t);
  }

  async deleteItem(id: number , t?: Transaction ): Promise<number> {
    return await this.genericRepo.deleteItem(id,this.parametroModel,t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Parametro[] }> {
    const query = getQuery(params);
    if(params.id) {
      query.where.id = params.id;
    }
    const usuarios = await this.parametroModel.findAndCountAll(query);
    return toJSON(usuarios);
  }
}
