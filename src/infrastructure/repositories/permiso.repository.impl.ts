import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermisoModel } from '../database/models/permiso.model';
import { RolModel } from '../database/models/rol.model';
import { PermisoRepository } from '../../domain/repositories/permiso.repository';
import { Permiso } from '../../domain/entities/permiso.entity';
import { GenericRepository } from '../database/generic.repository';
import { Op,Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class PermisoRepositoryImpl implements PermisoRepository {
  constructor(
    @InjectModel(PermisoModel)
    private readonly permisoModel: typeof PermisoModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async findOne(params = {}): Promise<Permiso> {
    const query: any = {};
    query.where = params;
    const result = await this.permisoModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Permiso,
    t?: Transaction,
  ): Promise<Permiso> {
    return await this.genericRepo.createOrUpdate(item, this.permisoModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.permisoModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Permiso[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.permisoModel.findAndCountAll(query);
    return toJSON(result);
  }

  async findByRoles(roles: any): Promise<{ count: number; rows: Permiso[] }> {
    const query:any = {};

    query.where = {
      estado: 'ACTIVO'
    };

    query.include = [
      {
        required   : true,
        model: RolModel,
        as: 'roles',
        where      : {
          id: {
            [Op.in]: roles
          }
        }
      }
    ];

    const result = await this.permisoModel.findAndCountAll(query);
    return toJSON(result);
  }

  async verificarPermisos (params : any): Promise<Permiso> {
      const query: any = {
        attributes: ['id']
      };
      query.where = {
        nombre: {
          [Op.in]: params.permisos
        }
  
      };

      query.include = [
      {
        required   : true,
        through    : { attributes: [] },
        attributes : [],
        model      :  RolModel,
        as         : 'roles',
        where      : {
          id: {
            [Op.in]: params.roles
          }
        }
      }
    ];
      
      const result = await this.permisoModel.findOne(query);
      return result?.toJSON();
    }
}
