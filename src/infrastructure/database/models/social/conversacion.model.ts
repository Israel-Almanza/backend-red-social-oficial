import { Column, Model, Table, DataType } from 'sequelize-typescript'
import { setTimestamps } from '@/infrastructure/lib/utils'

@setTimestamps()
@Table({ tableName: 'social_conversacion' })
export class ConversacionModel extends Model {

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'es_grupo'
  })
  esGrupo: boolean // isGroup (indicates if the conversation is a group chat)

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  titulo: string // title (name of the conversation or group)
}
