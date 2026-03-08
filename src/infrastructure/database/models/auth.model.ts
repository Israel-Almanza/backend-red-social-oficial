import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_auth',
  paranoid: true,
  timestamps: true,
})
export class AuthModel extends Model {
  // -----------------------------------------
  // CAMPOS NORMALES
  // -----------------------------------------

  @Column({ type: DataType.TEXT })
  ip: string;

  @Column({ type: DataType.TEXT })
  state: string;

  @Column({ type: DataType.TEXT })
  estado: string;

  @Column({ type: DataType.JSONB })
  parametros: object;

  @Column({ type: DataType.TEXT })
  navegador: string;

  @Column({ field: 'user_agent', type: DataType.TEXT })
  userAgent: string;

  @Column({ field: 'token_sistema', type: DataType.TEXT, allowNull: true })
  tokenSistema: string | null;

  @Column({ type: DataType.JSONB, allowNull: true })
  tokens: object | null; // { id_token, access_token, refresh_token }

  @Column({ field: 'id_entidad', type: DataType.INTEGER })
  idEntidad: string;

  @Column({ field: 'id_rol', type: DataType.INTEGER })
  idRol: string;

  @Column({ field: 'id_usuario', type: DataType.INTEGER })
  idUsuario: string;
}
