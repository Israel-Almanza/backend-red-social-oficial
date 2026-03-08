import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from '../database/models/auth.model';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { Auth } from '../../domain/entities/auth.entity';
import { GenericRepository } from '../database/generic.repository';
import { Op, Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectModel(AuthModel)
    private readonly authModel: typeof AuthModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async codificarContrasena(password: string): Promise<string> {

    const SALT_ROUNDS = 10;
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async verificarContrasena(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async findOne(params = {}): Promise<Auth> {
    const query: any = {};
    query.where = params;
    const result = await this.authModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Auth,
    t?: Transaction,
  ): Promise<Auth> {
    return await this.genericRepo.createOrUpdate(item, this.authModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.authModel, t);
  }

  async deleteItemCond(params, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItemCond(params, this.authModel, t);
  }


  async findAll(params: any): Promise<{ count: number; rows: Auth[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.authModel.findAndCountAll(query);
    return toJSON(result);
  }
}
