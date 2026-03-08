import {
  Column,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps() // agrega createdAt, updatedAt, deletedAt según tu utilidad
@Table({
  tableName: 'sys_parametro',
  paranoid: true,
  timestamps: true,
})
export class ParametroModel extends Model {
  
  @Column({ type: DataType.STRING(100), allowNull: false })
  grupo: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  codigo: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  otros: string | null;

  @Column({ type: DataType.STRING(200), allowNull: false })
  nombre: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  descripcion: string | null;

  @Column({
    type: DataType.ENUM('ACTIVO', 'INACTIVO'),
    allowNull: false,
    field: 'estado',
  })
  estado: 'ACTIVO' | 'INACTIVO';
}
