import { Injectable } from '@nestjs/common';
import { ConversacionRepositoryImpl } from '@/infrastructure/repositories/social/conversacion.repository.impl';
import { Conversacion } from '@/domain/entities/social/conversacion.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class ConversacionService {
    constructor(
        private readonly repo: ConversacionRepositoryImpl,
        private readonly transaction: TransactionService,
    ) { }

    async createOrUpdate(datos: any): Promise<Conversacion> {
        let t;
        try {
            t = await this.transaction.create();
            const result = await this.repo.createOrUpdate(datos, t);
            await this.transaction.commit(t);
            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Conversacion> {
        try {
            return await this.repo.findOne(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id: number): Promise<number> {
        try {
            return await this.repo.deleteItem(id);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params: any): Promise<{ count: number; rows: Conversacion[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
