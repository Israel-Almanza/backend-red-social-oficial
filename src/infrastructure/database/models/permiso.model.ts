import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';

// Suponiendo que setTimestamps es un decorador que agrega createdAt/updatedAt/deletedAt
import { setTimestamps } from '@/infrastructure/lib/utils';

export type PermisoTipo = 'SISTEMA' | 'INTEROPERABILIDAD';
export type PermisoEstado = 'ACTIVO' | 'INACTIVO';

@setTimestamps()
@Table({
  tableName: 'sys_permiso',
  paranoid: true,
  timestamps: true,
})
export class PermisoModel extends Model {

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  nombre!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descripcion?: string;

  @Column({
    type: DataType.ENUM('SISTEMA', 'INTEROPERABILIDAD'),
    allowNull: false,
    defaultValue: 'SISTEMA',
  })
  tipo!: PermisoTipo;

  @Column({
    type: DataType.ENUM('ACTIVO', 'INACTIVO'),
    allowNull: false,
    defaultValue: 'ACTIVO',
  })
  estado!: PermisoEstado;
}
