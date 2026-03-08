import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuModel } from '../database/models/menu.model';
import { MenuRepository } from '../../domain/repositories/menu.repository';
import { Menu } from '../../domain/entities/menu.entity';
import { GenericRepository } from '../database/generic.repository';
import { Op,Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';
import { RolModel } from '../database/models/rol.model';

@Injectable()
export class MenuRepositoryImpl implements MenuRepository {
  constructor(
    @InjectModel(MenuModel)
    private readonly menuModel: typeof MenuModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async findOne(params = {}): Promise<Menu> {
    const query: any = {};
    query.where = params;
    const result = await this.menuModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: Menu,
    t?: Transaction,
  ): Promise<Menu> {
    return await this.genericRepo.createOrUpdate(item, this.menuModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.menuModel, t);
  }

  async findById(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.findById(id, this.menuModel);
  }

  async findAll(params: any): Promise<{ count: number; rows: Menu[] }> {
    const query = getQuery(params);

    if (params.id) {
      query.where.id = params.id;
    }

    const result = await this.menuModel.findAndCountAll(query);
    return toJSON(result);
  }

  async findByRoles(roles: any): Promise<{ count: number; rows: Menu[] }> {
    const query:any = {};
    query.where = {
      estado: 'ACTIVO'
    };

     query.attributes = [
      'id',
      'nombre',
      'ruta',
      'icono',
      'idMenu',
      'orden',
      'estado'
    ];

    query.order = [['orden', 'ASC']];


    query.include = [
      {
         required   : true,
        through    : { attributes: [] },
        attributes : [],
        model: RolModel,
        as: 'roles',
        where      : {
          id: {
            [Op.in]: roles
          }
        }
      }
    ];

    const result = await this.menuModel.findAndCountAll(query);
    return toJSON(result);
  }
}
