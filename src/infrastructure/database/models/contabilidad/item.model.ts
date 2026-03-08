import { Column, Model, Table, DataType } from 'sequelize-typescript'
import { setTimestamps } from '@/infrastructure/lib/utils'

@setTimestamps()
@Table({ tableName: 'ctb_item' })
export class ItemModel extends Model {

  @Column({ type: DataType.TEXT })
  imagen: string // image

  @Column({ type: DataType.TEXT })
  nombre: string // name

  @Column({ type: DataType.TEXT, field: 'codigo_item', })
  codigoItem: string // itemCode

  @Column({ type: DataType.TEXT, field: 'grupo_item', })
  grupoItem: string // itemGroup

  @Column({ type: DataType.TEXT })
  para: string // for

  @Column({ type: DataType.TEXT, field: 'tipo_item', })
  tipoItem: string // itemType

  @Column({ type: DataType.TEXT })
  unidad: string // unit

  @Column({ type: DataType.TEXT })
  precio: string // rate

  @Column({ type: DataType.TEXT })
  descripcion: string // description

  @Column({ type: DataType.TEXT, field: 'cuenta_ingreso' })
  cuentaIngreso: string // incomeAccount

  @Column({ type: DataType.TEXT, field: 'cuenta_gasto' })
  cuentaGasto: string // expenseAccount

  @Column({ type: DataType.TEXT })
  impuesto: string // tax

  @Column({ type: DataType.TEXT, field: 'codgio_hsn', })
  codigoHSN: string // hsnCode

  @Column({ type: DataType.TEXT, field: 'codigo_barra', })
  codigoBarra: string // barcode

  @Column({ type: DataType.BOOLEAN, field: 'rastrear_item', })
  rastrearItem: boolean // trackItem

  @Column({ type: DataType.BOOLEAN, field: 'tiene_lote', })
  tieneLote: boolean // hasBatch

  @Column({ type: DataType.BOOLEAN, field: 'tiene_serie', })
  tieneSerie: boolean // hasSerialNumber

  @Column({ type: DataType.TEXT, field: 'serie_numeracion', })
  serieNumeracion: string // serialNumberSeries
}
