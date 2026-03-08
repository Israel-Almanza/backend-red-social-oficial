import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemModel } from '@/infrastructure/database/models/contabilidad/item.model';
import { ItemRepository } from '../../../domain/repositories/contabilidad/item.repository';
import { Item } from '../../../domain/entities/item.entity';
import { GenericRepository } from '../../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../../lib/utils';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(
    @InjectModel(ItemModel)
    private readonly itemModel: typeof ItemModel,

    private readonly genericRepo: GenericRepository,
  ) {}

  async findOne(params = {}): Promise<Item> {
    const query: any = {};
    query.where = params;
    const result = await this.itemModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Item,
    t?: Transaction,
  ): Promise<Item> {
    return await this.genericRepo.createOrUpdate(item, this.itemModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.itemModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Item[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.itemModel.findAndCountAll(query);
    return toJSON(result);
  }
}
