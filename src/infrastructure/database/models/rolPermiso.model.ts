import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_rol_permiso',
  paranoid: true,
  timestamps: true,
})
export class RolPermisoModel extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_rol',
  })
  idRol: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_permiso',
  })
  idPermiso: number;

}
