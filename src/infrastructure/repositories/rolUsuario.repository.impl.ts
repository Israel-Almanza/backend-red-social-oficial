import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolUsuarioModel } from '../database/models/rolUsuario.model';
import { RolUsuarioRepository } from '../../domain/repositories/rolUsuario.repository';
import { RolUsuario } from '../../domain/entities/rolUsuario.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class RolUsuarioRepositoryImpl implements RolUsuarioRepository {
  constructor(
    @InjectModel(RolUsuarioModel)
    private readonly rolUsuarioModel: typeof RolUsuarioModel,

    private readonly genericRepo: GenericRepository,
  ) {}

  async findOne(params = {}): Promise<RolUsuario> {
    const query: any = {};
    query.where = params;
    const result = await this.rolUsuarioModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: RolUsuario,
    t?: Transaction,
  ): Promise<RolUsuario> {
    return await this.genericRepo.createOrUpdate(item, this.rolUsuarioModel, t);
  }

  async deleteItemCond(params, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItemCond(params, this.rolUsuarioModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.rolUsuarioModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: RolUsuario[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.rolUsuarioModel.findAndCountAll(query);
    return toJSON(result);
  }
}
