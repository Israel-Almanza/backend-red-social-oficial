import { Column, Model, Table, DataType } from 'sequelize-typescript'
import { setTimestamps } from '@/infrastructure/lib/utils'

@setTimestamps()
@Table({ tableName: 'social_usuario_conversacion' })
export class UsuarioConversacionModel extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'usuario_id'
  })
  usuarioId: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'conversacion_id'
  })
  conversacionId: number

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  rol: string
}
