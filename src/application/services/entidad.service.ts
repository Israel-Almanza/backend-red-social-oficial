import { Injectable } from '@nestjs/common';
import { EntidadRepositoryImpl } from '@/infrastructure/repositories/entidad.repository.impl';
import { Entidad } from '@/domain/entities/entidad.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class EntidadService {
    constructor(
        private readonly repo: EntidadRepositoryImpl,
        private readonly transaction: TransactionService,
    ) {}

    async crear(datos: any): Promise<Entidad> {
        let t;
        try {
            t = await this.transaction.create();

            const entity = new Entidad(
                null,
            );

            const result = await this.repo.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Entidad> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

        let t;
        try {
            t = await this.transaction.create();

            const entity = new Entidad(
                datos.id,
            );

            const result = await this.repo.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Entidad> {
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

    async listar(params: any): Promise<{ count: number; rows: Entidad[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
