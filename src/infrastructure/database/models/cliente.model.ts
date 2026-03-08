import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'clientes' })
export class ClienteModel extends Model {
  @Column
  nombre: string;

  @Column
  nit: string;
}