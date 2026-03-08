import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { setTimestamps } from '@/infrastructure/lib/utils';

@setTimestamps()
@Table({
  tableName: 'sys_persona',
  paranoid: true,
  timestamps: true,
})
export class PersonaModel extends Model {
  // -----------------------------------------
  // CAMPOS NORMALES
  // -----------------------------------------

  @Column({ field: 'tipo_documento', type: DataType.STRING(15) })
  tipoDocumento: string;

  @Column({ field: 'numero_documento', type: DataType.STRING(15) })
  numeroDocumento: string;

  @Column({ type: DataType.STRING(3), allowNull: true })
  complemento: string | null;

  @Column({ field: 'fecha_nacimiento', type: DataType.DATEONLY, allowNull: true })
  fechaNacimiento: Date | null;

  @Column({ type: DataType.STRING(100), allowNull: false })
  nombres: string;

  @Column({ field: 'primer_apellido', type: DataType.STRING(100), allowNull: true })
  primerApellido: string | null;

  @Column({ field: 'segundo_apellido', type: DataType.STRING(100), allowNull: true })
  segundoApellido: string | null;

  @Column({ type: DataType.STRING(50), allowNull: true })
  telefono: string | null;

  @Column({ type: DataType.STRING(50), allowNull: true })
  celular: string | null;

  @Column({ field: 'correo_electronico', type: DataType.STRING(100), allowNull: true })
  correoElectronico: string | null;

  @Column({
    type: DataType.ENUM('MASCULINO', 'FEMENINO'),
    allowNull: true,
  })
  genero: 'MASCULINO' | 'FEMENINO' | null;

  @Column({ type: DataType.STRING(500), allowNull: true })
  direccion: string | null;

  // -----------------------------------------
  // CAMPOS VIRTUALES
  // -----------------------------------------

  @Column({
    type: DataType.VIRTUAL,
    get(this: PersonaModel) {
      if (this.segundoApellido) {
        return `${this.nombres} ${this.primerApellido} ${this.segundoApellido}`;
      }
      return `${this.nombres} ${this.primerApellido}`;
    },
  })
  nombreCompleto: string;

  @Column({
    type: DataType.VIRTUAL,
    get(this: PersonaModel) {
      if (this.complemento) {
        return `${this.numeroDocumento}-${this.complemento}`;
      }
      return `${this.numeroDocumento}`;
    },
  })
  numeroDocumentoCompleto: string;

}
