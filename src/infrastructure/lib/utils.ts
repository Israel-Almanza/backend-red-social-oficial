import { Column, CreatedAt, UpdatedAt, DeletedAt, DataType } from 'sequelize-typescript';
import * as moment from 'moment';
export interface QueryOptions {
  limit?: number;
  page?: number;
  order?: string; // ejemplo: "createdAt" o "-createdAt"
}

export function getQuery(options: any = {}) {
  const query: any = {
    where: {},
    order: []
  };

  // Pagination
  if (options.limit) {
    query.limit = Number(options.limit);
    query.offset = options.page
      ? (Number(options.page) - 1) * Number(options.limit)
      : 0;
  }

  // Order
  const orderField = options.order ?? 'createdAt';

  if (orderField.startsWith('-')) {
    query.order.push([orderField.substring(1), 'DESC']);
  } else {
    query.order.push([orderField, 'ASC']);
  }

  // Always add second sort by ID
  query.order.push(['id', 'ASC']);

  return query;
}

export function toJSON(result: any) {
  const rows = [];
  let count = 0;

  if (result) {
    if (result.rows && Array.isArray(result.rows)) {
      result.rows.map(item => {
        rows.push(item.toJSON());
      });
    }

    count = result.count || 0;
  }

  return {
    count,
    rows,
  };
}

// src/common/sequelize/timestamps.decorator.ts


export function setTimestamps(): ClassDecorator {
  return function (target: any) {

    // user_created
    Column({
      field: '_user_created',
      type: DataType.INTEGER,
      allowNull: true
    })(target.prototype, 'userCreated');

    // user_updated
    Column({
      field: '_user_updated',
      type: DataType.INTEGER,
      allowNull: true
    })(target.prototype, 'userUpdated');

    // user_deleted
    Column({
      field: '_user_deleted',
      type: DataType.INTEGER,
      allowNull: true
    })(target.prototype, 'userDeleted');

    // created_at
    Column({
      field: '_created_at',
      type: DataType.DATE,
      allowNull: false,
      get() {
        const v = this.getDataValue('createdAt');
        return v ? moment(v).format('DD-MM-YYYY HH:mm:ss') : null;
      }
    })(target.prototype, 'createdAt');
    CreatedAt(target.prototype, 'createdAt');

    // updated_at
    Column({
      field: '_updated_at',
      type: DataType.DATE,
      allowNull: true,
      get() {
        const v = this.getDataValue('updatedAt');
        return v ? moment(v).format('DD-MM-YYYY HH:mm:ss') : null;
      }
    })(target.prototype, 'updatedAt');
    UpdatedAt(target.prototype, 'updatedAt');

    // deleted_at
    Column({
      field: '_deleted_at',
      type: DataType.DATE,
      allowNull: true,
      get() {
        const v = this.getDataValue('deletedAt');
        return v ? moment(v).format('DD-MM-YYYY HH:mm:ss') : null;
      }
    })(target.prototype, 'deletedAt');
    DeletedAt(target.prototype, 'deletedAt');
  };
}