import { Column, Model, Table, DataType } from 'sequelize-typescript'
import { setTimestamps } from '@/infrastructure/lib/utils'

@setTimestamps()
@Table({ tableName: 'social_mensaje' })
export class MensajeModel extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'conversacion_id'
  })
  conversacionId: number // conversationId (FK to Conversations)

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'remitente_id'
  })
  remitenteId: number // senderId (FK to Users, indicates who sent the message)

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  contenido: string // content (text or message data)

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'no_leido'
  })
  noLeido: boolean // unread (indicates if the message has not been read)
}
