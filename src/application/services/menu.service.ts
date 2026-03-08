import { Injectable } from '@nestjs/common';
import { MenuRepositoryImpl } from '@/infrastructure/repositories/menu.repository.impl';
import { Menu } from '@/domain/entities/menu.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class MenuService {
    constructor(
        private readonly repo: MenuRepositoryImpl,
        private readonly transaction: TransactionService,
    ) {}

    async crear(datos: any): Promise<Menu> {
        let t;
        try {
            t = await this.transaction.create();

            datos.estado = 'ACTIVO'
            const entity = new Menu(
                null,
                datos.nombre,
                datos.ruta,
                datos.estado,
                datos.icono,
                datos.userCreated
            );

            const result = await this.repo.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Menu> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

        let t;
        try {
            t = await this.transaction.create();

            const entity = new Menu(
                datos.id,
                datos.nombre,
                datos.ruta,
                datos.estado,
                datos.icono,
                datos.userCreated
            );

            const result = await this.repo.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Menu> {
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

    async listar(params: any): Promise<{ count: number; rows: Menu[] }> {
        try {
            return await this.repo.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
