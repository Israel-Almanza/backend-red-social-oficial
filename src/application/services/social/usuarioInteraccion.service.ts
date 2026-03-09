import { Injectable } from '@nestjs/common';
import { UsuarioInteraccionRepositoryImpl } from '@/infrastructure/repositories/social/usuarioInteraccion.repository.impl';
import { UsuarioInteraccion } from '@/domain/entities/social/usuarioInteraccion.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';
import { ConversacionRepositoryImpl } from '@/infrastructure/repositories/social/conversacion.repository.impl';
import { UsuarioConversacionRepositoryImpl } from '@/infrastructure/repositories/social/usuarioConversacion.repository.impl';

@Injectable()
export class UsuarioInteraccionService {
    constructor(
        private readonly usuarioInteraccionRepository: UsuarioInteraccionRepositoryImpl,
        private readonly conversacionRepository: ConversacionRepositoryImpl,
        private readonly usuarioConversacionRepository: UsuarioConversacionRepositoryImpl,
        private readonly transaction: TransactionService,
    ) { }

    async likeUsuario(datos: any): Promise<UsuarioInteraccion> {
        let t;
        try {
            t = await this.transaction.create();

            datos.tipo = 'like'
            console.log('imprimir ', datos)
            const result = await this.usuarioInteraccionRepository.createOrUpdate(datos, t);
            // buscar si ya existe like inverso
            let likeExistente = null
            likeExistente = await this.usuarioInteraccionRepository.findOne({
                usuarioOrigenId: datos.usuarioOrigenId,
                usuarioDestinoId: datos.usuarioDestinoId,
                tipo: 'like'
            });

            if (!likeExistente) {
                likeExistente = await this.usuarioInteraccionRepository.findOne({
                    usuarioDestinoId: datos.usuarioOrigenId,
                    usuarioOrigenId: datos.usuarioDestinoId,
                    tipo: 'like'
                });
            }

            console.log('existe like ya ', likeExistente)

            if (likeExistente) {

                // crear conversación
                const conversacion = await this.conversacionRepository.createOrUpdate(datos, t);
                console.log('conversacion creada ', conversacion)

                // crear participantes

                await Promise.all(
                    [datos.usuarioOrigenId, datos.usuarioDestinoId].map(usuarioId =>
                        this.usuarioConversacionRepository.createOrUpdate({
                            usuarioId: usuarioId,
                            conversacionId: Number(conversacion.id),
                            // userCreated: datos.userCreated
                        })
                    )
                );

                
                /* return {

                    // match: true,
                    conversacionId: Number(conversacion.id) || 0
                };*/
            }

            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<UsuarioInteraccion> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }

        let t;
        try {
            t = await this.transaction.create();

            const result = await this.usuarioInteraccionRepository.createOrUpdate(datos, t);
            await this.transaction.commit(t);

            return result;
        } catch (error) {
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async findOne(params): Promise<UsuarioInteraccion> {
        try {
            return await this.usuarioInteraccionRepository.findOne(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id: number): Promise<number> {
        try {
            return await this.usuarioInteraccionRepository.deleteItem(id);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params: any): Promise<{ count: number; rows: UsuarioInteraccion[] }> {
        try {
            return await this.usuarioInteraccionRepository.findAll(params);
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}
