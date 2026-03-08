import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolMenuModel } from '../database/models/rolMenu.model';
import { RolMenuRepository } from '../../domain/repositories/rolMenu.repository';
import { RolMenu } from '../../domain/entities/rolMenu.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class RolMenuRepositoryImpl implements RolMenuRepository {
  constructor(
    @InjectModel(RolMenuModel)
    private readonly rolMenuModel: typeof RolMenuModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async findOne(params = {}): Promise<RolMenu> {
    const query: any = {};
    query.where = params;
    const result = await this.rolMenuModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: RolMenu,
    t?: Transaction,
  ): Promise<RolMenu> {
    return await this.genericRepo.createOrUpdate(item, this.rolMenuModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.rolMenuModel, t);
  }

  async deleteItemCond(params, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItemCond(params, this.rolMenuModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: RolMenu[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.rolMenuModel.findAndCountAll(query);
    return toJSON(result);
  }
}
