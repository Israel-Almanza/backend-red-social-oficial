import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolModel } from '../database/models/rol.model';
import { RolRepository } from '../../domain/repositories/rol.repository';
import { Rol } from '../../domain/entities/rol.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';
import { MenuModel } from '../database/models/menu.model';

@Injectable()
export class RolRepositoryImpl implements RolRepository {
  constructor(
    @InjectModel(RolModel)
    private readonly rolModel: typeof RolModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async findOne(params = {}): Promise<Rol> {
    const query: any = {};
    query.where = params;
    query.include = [
      {
        through: { attributes: [] },
        model: MenuModel,
        as: 'menus'
      }
    ];
    const result = await this.rolModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Rol,
    t?: Transaction,
  ): Promise<Rol> {
    return await this.genericRepo.createOrUpdate(item, this.rolModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.rolModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Rol[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    query.include = [
      {
        through: { attributes: [] },
        model: MenuModel,
        as: 'menus'
      }
    ];

    const result = await this.rolModel.findAndCountAll(query);
    return toJSON(result);
  }
}
