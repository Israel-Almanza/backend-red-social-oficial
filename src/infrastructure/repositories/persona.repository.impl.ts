import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PersonaModel } from '../database/models/persona.model';
import { PersonaRepository } from '@/domain/repositories/persona.repository';
import { Persona } from '@/domain/entities/persona.entity';
import { GenericRepository } from '../database/generic.repository';
import { Transaction } from 'sequelize';
import { toJSON, getQuery } from '../lib/utils';

@Injectable()
export class PersonaRepositoryImpl implements PersonaRepository {
  constructor(
    @InjectModel(PersonaModel)
    private readonly personaModel: typeof PersonaModel,

    private readonly genericRepo: GenericRepository, // ✅ inyectado
  ) {}

  async findOne(params= {} ): Promise<Persona> {
    const query: any = {};
    query.where = params;
    const result = await this.personaModel.findOne(query);
    return result.toJSON();
  }

  async findOrCreate(data: any ): Promise<Persona> {
 
    let result = null;
    const cond = {
      where: {
        numeroDocumento: data.numeroDocumento || null
      }
    };
    result = await this.personaModel.findOne(cond);
    if (!result) {
      result = await this.personaModel.create(data);
    }
    
    return result.toJSON();
  }

  async createOrUpdate(item: Persona , t?: Transaction ): Promise<Persona> {
    return await this.genericRepo.createOrUpdate(item,this.personaModel,t);
  }

  async deleteItem(id: number , t?: Transaction ): Promise<number> {
    return await this.genericRepo.deleteItem(id,this.personaModel,t);
  }

  async findAll(params: any): Promise<{ count: number; rows: Persona[] }> {
    const query = getQuery(params);
    if(params.id) {
      query.where.id = params.id;
    }
    const usuarios = await this.personaModel.findAndCountAll(query);
    return toJSON(usuarios);
  }
}
