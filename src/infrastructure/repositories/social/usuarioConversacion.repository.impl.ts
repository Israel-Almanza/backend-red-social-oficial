import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';;
import { UsuarioConversacionModel } from '../../database/models/social/usuarioConversacion.model';
import { UsuarioConversacionRepository } from '@/domain/repositories/social/usuarioConversacion.repository';
import { UsuarioConversacion } from '../../../domain/entities/social/usuarioConversacion.entity';
import { GenericRepository } from '../../database/generic.repository';
import { Op, QueryTypes, Transaction } from 'sequelize';
import { toJSON, getQuery } from '../../lib/utils';
import { ConversacionModel } from '@/infrastructure/database/models/social/conversacion.model';
import { MensajeModel } from '@/infrastructure/database/models/social/mensaje.model';
import { UsuarioModel } from '@/infrastructure/database/models/usuario.model';

@Injectable()
export class UsuarioConversacionRepositoryImpl implements UsuarioConversacionRepository {
  constructor(
    @InjectModel(UsuarioConversacionModel)
    private readonly usuarioConversacionModel: typeof UsuarioConversacionModel,

    private readonly genericRepo: GenericRepository,
  ) { }

  async findOne(params = {}): Promise<UsuarioConversacion> {
    const query: any = {};
    query.where = params;
    const result = await this.usuarioConversacionModel.findOne(query);
    return result?.toJSON();
  }

  async createOrUpdate(
    item: UsuarioConversacion,
    t?: Transaction,
  ): Promise<UsuarioConversacion> {
    return await this.genericRepo.createOrUpdate(item, this.usuarioConversacionModel, t);
  }

  async deleteItem(id: number, t?: Transaction): Promise<number> {
    return await this.genericRepo.deleteItem(id, this.usuarioConversacionModel, t);
  }

  async findAll(params: any): Promise<{ count: number; rows: UsuarioConversacion[] }> {
    const query = getQuery(params);

    query.distinct = true;
    //  query.col = 'social_usuario_conversacion.conversacion_id';

    if (params.id) {
      query.where.id = params.id;
    }

    // Si se proporciona `userId`, comprueba si es un array o un valor único
    if (params?.usuarioId) {
      query.where.usuarioId = Array.isArray(params.usuarioId)
        ? { [Op.in]: params.usuarioId }
        : params.usuarioId;
    }

    query.attributes = [
      'id',
      'usuarioId',
      'conversacionId',
      'userCreated',
      'createdAt',
      // 'estado'
    ];

    query.include = [
      {
        model: ConversacionModel,
        as: 'conversacion',
        attributes: [
          'id',
          'esGrupo',
          'titulo',
          'userCreated',
          'createdAt',
        ],
        required: true,
        include: [
          {
            model: MensajeModel,
            as: 'mensajes',
            separate: true,
            attributes: [
              'id',
              'contenido',
              'userCreated',
              // 'usuarioCreado',
              'createdAt'
            ],
            limit: 1,
            order: [['createdAt', 'DESC']], // último mensaje
            /* include: [
              {
                model: UsuarioModel,
                as: 'usuarioCreador',
                attributes: ['id', 'usuario', 'imagenUrl']
              }
            ] */
          },
          // 🔹 AQUÍ TRAEMOS EL OTRO USUARIO
          {
            model: UsuarioConversacionModel,
            as: 'participantes',
            attributes: ['usuarioId'],
            where: {
              usuarioId: {
                [Op.ne]: params.usuarioId // todos los partipantes menos yo
              }
            },
            include: [
              {
                model: UsuarioModel,
                as: 'participante',
                attributes: ['id', 'usuario', 'imagenUrl']
              }
            ]
          }
        ]
      },

    ];

    const result = await this.usuarioConversacionModel.findAndCountAll(query);
    return toJSON(result);
  }

  async existeConversacionEntreUsuarios(params: any) {

    const consulta = `
    SELECT conversacion_id
    FROM social_usuario_conversacion
    WHERE usuario_id IN ('${params.remitenteId}', '${params.receptorId}')
    GROUP BY conversacion_id
    HAVING COUNT(DISTINCT usuario_id) = 2; 
        `
    const result = await this.usuarioConversacionModel.sequelize.query(
      consulta, { type: QueryTypes.SELECT });
    return result;
  }


}
