import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_rol_usuario',
  paranoid: true,
  timestamps: true,
})
export class RolUsuarioModel extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_usuario',
  })
  idUsuario: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_rol',
  })
  idRol: number;

}
