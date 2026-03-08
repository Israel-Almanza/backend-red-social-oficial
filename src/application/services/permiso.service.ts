import { Injectable } from '@nestjs/common';
import { PermisoRepositoryImpl } from '@/infrastructure/repositories/permiso.repository.impl';
import { Permiso } from '@/domain/entities/permiso.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class PermisoService {
    constructor(
        private readonly repo: PermisoRepositoryImpl,
        private readonly transaction: TransactionService,
    ) {}

    async crear(datos: any): Promise<Permiso> {
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

    async actualizar(datos: any): Promise<Permiso> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

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

    async findOne(params): Promise<Permiso> {
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

    async listar(params: any): Promise<{ count: number; rows: Permiso[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
