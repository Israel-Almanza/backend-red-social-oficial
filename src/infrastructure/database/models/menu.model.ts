import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_menu',
  paranoid: true,
  timestamps: true,
})
export class MenuModel extends Model {

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  nombre: string;

  @Column({
    type: DataType.STRING(200),
    defaultValue: null,
  })
  ruta: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'icono',
  })
  icono: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'id_menu',
  })
  idMenu: number | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  orden: number;

  @Column({
    type: DataType.ENUM('ACTIVO', 'INACTIVO'),
    allowNull: false,
  })
  estado: 'ACTIVO' | 'INACTIVO';
}
