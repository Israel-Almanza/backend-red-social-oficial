import { Injectable } from '@nestjs/common';
import { RolRepositoryImpl } from '@/infrastructure/repositories/rol.repository.impl';
import { RolMenuRepositoryImpl } from '@/infrastructure/repositories/rolMenu.repository.impl';
import { Rol } from '@/domain/entities/rol.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class RolService {
    constructor(
        private readonly rolRepository: RolRepositoryImpl,
        private readonly rolMenuRepository: RolMenuRepositoryImpl,
        private readonly transaction: TransactionService,
    ) { }

    async createOrUpdate(datos: any): Promise<Rol> {
        let t;
        let rol;
        try {
            t = await this.transaction.create();

            rol = await this.rolRepository.createOrUpdate(datos, t);

            if (datos.menus) {
                await this.rolMenuRepository.deleteItemCond({ idRol: rol.id });
                for (const menu of datos.menus) {
                    await this.rolMenuRepository.createOrUpdate({
                        idRol: rol.id,
                        idMenu: menu,
                        userCreated: datos.userCreated || datos.userUpdated
                    });
                }
            }
            await this.transaction.commit(t);

            return rol;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Rol> {
        try {
            return await this.rolRepository.findOne(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id: number): Promise<number> {
        try {
            return await this.rolRepository.deleteItem(id);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params: any): Promise<{ count: number; rows: Rol[] }> {
        try {
            return await this.rolRepository.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
