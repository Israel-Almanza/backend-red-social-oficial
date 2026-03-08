import { Injectable } from '@nestjs/common';
import { ParametroRepositoryImpl } from '../../infrastructure/repositories/parametro.repository.impl';
import { Parametro } from '../../domain/entities/parametro.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class ParametroService {
    constructor(
        private readonly repo: ParametroRepositoryImpl,
        private readonly transaction: TransactionService, // ✅ inyectado
    ) { }

    async crear(datos: any): Promise<Parametro> {
        let t;
        try {
            t = await this.transaction.create();
            const result = await this.repo.createOrUpdate(new Parametro(null, datos.grupo, datos.codigo, datos.nombre, datos.descripcion), t);
            await this.transaction.commit(t);
            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Parametro> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }
        let t;
        try {
            t = await this.transaction.create();

            const result = await this.repo.createOrUpdate(
                new Parametro(
                    datos.id,                     // ✅ AQUÍ YA VA EL ID
                    datos.grupo,
                    datos.codigo,
                    datos.nombre,
                    datos.descripcion
                ),
                t
            );

            await this.transaction.commit(t);
            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Parametro> {
        try {
            const respuesta = await this.repo.findOne(params);
            return respuesta
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id:number): Promise<number> {
        try {
            const respuesta = await this.repo.deleteItem(id);
            return respuesta
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params): Promise<{ count: number; rows: Parametro[] }> {
        try {
            const respuesta = await this.repo.findAll(params);
            return respuesta
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}

