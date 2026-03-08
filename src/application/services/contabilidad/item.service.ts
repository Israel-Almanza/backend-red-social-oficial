import { Injectable } from '@nestjs/common';
import { ItemRepositoryImpl } from '@/infrastructure/repositories/contabilidad/item.repository.impl';
import { Item } from '@/domain/entities/item.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class ItemService {
    constructor(
        private readonly repo: ItemRepositoryImpl,
        private readonly transaction: TransactionService,
    ) {}

    async crear(datos: any): Promise<Item> {
        let t;
        try {
            t = await this.transaction.create();

            /* const entity = new Item(
                null,
                datos.nombre
            ); */


            const result = await this.repo.createOrUpdate(datos, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Item> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

        let t;
        try {
            t = await this.transaction.create();

            /* const entity = new Item(
                datos.id,
                datos.nombre
            ); */
            console.log('datos update ::: ',datos)

            const result = await this.repo.createOrUpdate(datos, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Item> {
        try {
            const response = await this.repo.findOne(params);
            return response
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

    async listar(params: any): Promise<{ count: number; rows: Item[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
