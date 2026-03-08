import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class TransactionService {

  constructor(
    @InjectConnection() private readonly sequelize: Sequelize, // ✅ ASÍ SE INYECTA
  ) {}

  async create(): Promise<Transaction> {
    return this.sequelize.transaction();
  }

  async commit(t: Transaction) {
    if (t) {
      await t.commit();
    }
  }

  async rollback(t: Transaction) {
    if (t) {
      await t.rollback();
    }
  }
}
