import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_rol_menu',
  paranoid: true,
  timestamps: true,
})
export class RolMenuModel extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_rol',
  })
  idRol: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_menu',
  })
  idMenu: number;

}
