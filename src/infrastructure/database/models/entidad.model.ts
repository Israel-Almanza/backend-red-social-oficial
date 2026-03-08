import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

export type Estado = 'ACTIVO' | 'INACTIVO';
export type TipoEntidad = 'ENTIDAD' | 'ENTIDAD_FINANCIERA';

@setTimestamps()
@Table({
  tableName: 'sys_entidad',
  paranoid: true,
  timestamps: true,
})
export class EntidadModel extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'id_departamento',
  })
  idDepartamento?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  codigo?: number;

  @Column({
    type: DataType.STRING(400),
    allowNull: false,
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  sigla!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  web?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  direccion?: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
  })
  telefono?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  email?: string;

  @Column({
    type: DataType.ENUM('ACTIVO', 'INACTIVO'),
    allowNull: false,
    defaultValue: 'ACTIVO',
  })
  estado!: Estado;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    field: 'ruta_logo'
  })
  rutaLogo?: string;
}
