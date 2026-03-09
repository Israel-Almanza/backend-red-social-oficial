import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioInteraccionModel } from '../../database/models/social/usuarioInteraccion.model';
import { UsuarioInteraccionRepository } from '../../../domain/repositories/social/usuarioInteraccion.repository';
import { UsuarioInteraccion } from '../../../domain/entities/social/usuarioInteraccion.entity';
import { GenericRepository } from '../../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../../lib/utils';

@Injectable()
export class UsuarioInteraccionRepositoryImpl implements UsuarioInteraccionRepository {
  constructor(
    @InjectModel(UsuarioInteraccionModel)
    private readonly usuarioInteraccionModel: typeof UsuarioInteraccionModel,

    private readonly genericRepo: GenericRepository,
  ) {}

  async findOne(params = {}): Promise<UsuarioInteraccion> {
    const query: any = {};
    query.where = params;
    const result = await this.usuarioInteraccionModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: UsuarioInteraccion,
    t?: Transaction,
  ): Promise<UsuarioInteraccion> {
    return await this.genericRepo.createOrUpdate(item, this.usuarioInteraccionModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.usuarioInteraccionModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: UsuarioInteraccion[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.usuarioInteraccionModel.findAndCountAll(query);
    return toJSON(result);
  }
}
