import { Injectable } from '@nestjs/common';
import { MensajeRepositoryImpl } from '@/infrastructure/repositories/social/mensaje.repository.impl';
import { Mensaje } from '@/domain/entities/social/mensaje.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';
import { UsuarioConversacionRepositoryImpl } from '@/infrastructure/repositories/social/usuarioConversacion.repository.impl';
import { ConversacionRepositoryImpl } from '@/infrastructure/repositories/social/conversacion.repository.impl';

@Injectable()
export class MensajeService {
    constructor(
        private readonly mensajeRepository: MensajeRepositoryImpl,
        private readonly usuarioConversacionRepository: UsuarioConversacionRepositoryImpl,
        private readonly conversacionRepository: ConversacionRepositoryImpl,
        private readonly transaction: TransactionService,
    ) { }

    async createOrUpdate(datos: any): Promise<Mensaje> {
        let t;
        try {
            t = await this.transaction.create();
            const result = await this.mensajeRepository.createOrUpdate(datos, t);
            await this.transaction.commit(t);
            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async crear(datos: any): Promise<Mensaje> {
        let t;
        try {
            let response = null
            t = await this.transaction.create();
            const existeConversacion = await this.usuarioConversacionRepository.existeConversacionEntreUsuarios(
                { remitenteId: datos.remitenteId, receptorId: datos.receptorId })

            // Caso de que no existe la conversacion en tre suatios    
            if (existeConversacion?.length == 0) {
                // 1 creamos en mensaje
                const conversacionCreada = await this.conversacionRepository.createOrUpdate(datos);

                await Promise.all(
                    [datos.remitenteId, datos.receptorId].map(usuarioId =>
                        this.usuarioConversacionRepository.createOrUpdate({
                            usuarioId: usuarioId,
                            conversacionId: Number(conversacionCreada.id)
                        })
                    )
                );
                datos.conversacionId = conversacionCreada.id
                // obersacion
                response = await this.mensajeRepository.createOrUpdate(datos);
            } else {
                // si existe conversacion 
                const existeConversacion: any = await this.usuarioConversacionRepository.existeConversacionEntreUsuarios({
                    remitenteId: datos.remitenteId, receptorId: datos.receptorId
                })
                if (existeConversacion?.length > 0) {
                    datos.conversacionId = existeConversacion[0].conversacion_id
                    // obersacion
                    response = await this.mensajeRepository.createOrUpdate(datos);
                }
            }

            // const result = await this.mensajeRepository.createOrUpdate(datos, t);
            await this.transaction.commit(t);
            return response;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }


    async actualizar(datos: any): Promise<Mensaje> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

        let t;
        try {
            t = await this.transaction.create();

            const entity = new Mensaje(
                datos.id,
                datos.mensaje
            );

            const result = await this.mensajeRepository.createOrUpdate(entity, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<Mensaje> {
        try {
            return await this.mensajeRepository.findOne(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id: number): Promise<number> {
        try {
            return await this.mensajeRepository.deleteItem(id);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params: any): Promise<{ count: number; rows: Mensaje[] }> {
        try {
            return await this.mensajeRepository.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
