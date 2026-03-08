import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export class GenericRepository {
  // ---------------------------------------------------------
  // CREATE OR UPDATE
  // ---------------------------------------------------------
  async createOrUpdate(
    object: any,
    model: any,
    t?: Transaction,
  ): Promise<any> {
    const cond: any = {
      where: { id: object.id || null },
    };

    if (t) cond.transaction = t;

    const item = await model.findOne(cond);

    if (item) {
      object.updatedAt = new Date();
      delete object.createdAt;

      await model.update(object, cond);
      const result = await model.findOne(cond);
      return result?.toJSON() ?? null;
    }

    object.createdAt = new Date();
    const result = await model.create(object, t ? { transaction: t } : {});
    return result.toJSON();
  }

  // ---------------------------------------------------------
  // FIND BY ID
  // ---------------------------------------------------------
  async findById(id: string | number, model: any, attributes: string[] = []) {
    const query: any = {
      where: { id }
    };

    if (attributes.length) query.attributes = attributes;

    try {
      const result = await model.findOne(query);
      return result ? result.toJSON() : null;
    } catch (err) {
      throw err;
    }
  }

  // ---------------------------------------------------------
  // DELETE ITEM (hard delete)
  // ---------------------------------------------------------
  async deleteItem(id: number, model: any, t?: Transaction) {
    const cond: any = { where: { id } };
    if (t) cond.transaction = t;

    try {
      const item = await model.findOne(cond);
      if (!item) return -1;

      const deleted = await model.destroy(cond);
      return +!!deleted; // 1 si eliminó, 0 si no
    } catch (e) {
      if (t) await t.rollback();
      throw new Error(e);
    }
  }

    // ---------------------------------------------------------
  // FIND ONE BY PARAMS
  // ---------------------------------------------------------
  async findOne(params: any, model: any) {
    const result = await model.findOne({ where: params });
    return result ? result.toJSON() : null;
  }

  // ---------------------------------------------------------
  // INACTIVATE ITEM (soft delete con estado)
  // ---------------------------------------------------------
  async inactivateItem(id: string | number, model: any, object: any) {
    const cond = { where: { id } };

    if (object && !object.updatedAt) {
      object.updatedAt = new Date();
    }

    try {
      const item = await model.findOne(cond);
      if (!item) return -1;

      if (item.estado === 'INACTIVO') {
        throw new Error('El registro ya se encuentra eliminado');
      }

      const updated = await model.update(object, cond);
      return +!!updated;
    } catch (e) {
      throw new Error(e);
    }
  }

  // ---------------------------------------------------------
  // DELETE ITEM CONDICIONAL (soft delete con deletedAt)
  // ---------------------------------------------------------
  async deleteItemCond(params: any, model: any, t?: Transaction) {
    const actualizacion = {
      userDeleted: params.userDeleted,
      deletedAt: new Date(),
    };

    delete params.userDeleted;

    const cond: any = { where: params };
    if (t) cond.transaction = t;

    try {
      const deleted = await model.update(actualizacion, cond);
      return deleted;
    } catch (e) {
      if (t) await t.rollback();
      throw new Error(e);
    }
  }

  /* async findAll(model: any): Promise<any[]> {
    const result = await model.findAll();
    return result.map(r => r.toJSON());
  } */
}
