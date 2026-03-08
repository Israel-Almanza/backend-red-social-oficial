import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioModel } from '../database/models/usuario.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';
import { GenericRepository } from '../database/generic.repository';
import { Model, Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';
import { PersonaModel } from '../database/models/persona.model';
import { EntidadModel } from '../database/models/entidad.model';
import { RolModel } from '../database/models/rol.model';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @InjectModel(UsuarioModel)
    private readonly usuarioModel: typeof UsuarioModel,

    private readonly genericRepo: GenericRepository, // ✅ inyectado
  ) { }

  async findOne(params = {}): Promise<Usuario> {
    const query: any = {};
    query.where = params;
    query.include = [
      {
        model: PersonaModel,
        as: 'persona',
      },
      {
        // attributes : ['id', 'nombre', 'sigla', 'idEntidadTutora'],
        model      : EntidadModel,
        as         : 'entidad'
      },
      {
        required   : false,
        through    : { attributes: [] },
        attributes : [
          'id',
          'idEntidad',
          'nombre',
          'descripcion',
          'estado'
        ],
        model : RolModel,
        as    : 'roles'
      }
    ];
    const result = await this.usuarioModel.findOne(query);
    return result.toJSON();
  }

  async createOrUpdate(item: Usuario, t?: Transaction): Promise<Usuario> {
    return await this.genericRepo.createOrUpdate(item, this.usuarioModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.usuarioModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Usuario[] }> {
    const query = getQuery(params);
    if (params.id) {
      query.where.id = params.id;
    }

    query.include = [
      {
        model: PersonaModel,
        as: 'persona',
      }
    ];
    const usuarios = await this.usuarioModel.findAndCountAll(query);
    return toJSON(usuarios);
  }


  async login(params = {}): Promise<Usuario> {
    const query: any = {};
    query.attributes = [
      'id',
      'contrasena',
      'usuario',
      'imagenUrl',
      // 'estado'
    ];
    query.where = params;

    /*query.include = [
      {
        attributes: [
          'id',
          'tipoDocumento',
          'numeroDocumento',
          'complemento',
          'nombres',
          'primerApellido',
          'segundoApellido',
          'fechaNacimiento'
        ],
        model: PersonaModel,
        as: 'persona',
      }, {
        attributes: ['id', 'nombre', 'sigla'],
        model: EntidadModel,
        as: 'entidad'
      }, {
        required: true,
        through: { attributes: [] },
        attributes: [
          'id',
          'idEntidad',
          'nombre',
          'descripcion',
          'estado'
        ],
        model: RolModel,
        as: 'roles'
      }
    ];*/
    const result = await this.usuarioModel.findOne(query);
    // console.log("print resultaldo ", result)
    return result.toJSON();
  }
}
