import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_rol',
  paranoid: true,
  timestamps: true,
})
export class RolModel extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'id_entidad',
  })
  idEntidad: number | null;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  nombre: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descripcion: string | null;

  @Column({
    type: DataType.ENUM('ACTIVO', 'INACTIVO'),
    allowNull: false,
    defaultValue: 'ACTIVO',
    field: 'estado',
  })
  estado: 'ACTIVO' | 'INACTIVO';
}
