import { Column, Model, Table, DataType } from 'sequelize-typescript'
import { setTimestamps } from '@/infrastructure/lib/utils'

@setTimestamps()
@Table({ tableName: 'social_usuario_interaccion' })
export class UsuarioInteraccionModel extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'usuario_origen_id'
  })
  usuarioOrigenId: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'usuario_destino_id'
  })
  usuarioDestinoId: number

  @Column({
    type: DataType.STRING,
    defaultValue: null,
    allowNull: true
  })
  tipo: string
}
