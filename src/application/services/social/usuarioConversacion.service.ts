import { Injectable } from '@nestjs/common';
import { UsuarioConversacionRepositoryImpl } from '@/infrastructure/repositories/social/usuarioConversacion.repository.impl';
import { UsuarioConversacion } from '@/domain/entities/social/usuarioConversacion.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class UsuarioConversacionService {
    constructor(
        private readonly repo: UsuarioConversacionRepositoryImpl,
        private readonly transaction: TransactionService,
    ) {}

    async createOrUpdate(datos: any): Promise<UsuarioConversacion> {
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

    async findOne(params): Promise<UsuarioConversacion> {
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

    async listar(params: any): Promise<{ count: number; rows: UsuarioConversacion[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
