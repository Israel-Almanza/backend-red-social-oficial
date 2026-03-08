import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository.impl';
import { PersonaRepositoryImpl } from '@/infrastructure/repositories/persona.repository.impl';
import { RolUsuarioRepositoryImpl } from '@/infrastructure/repositories/rolUsuario.repository.impl';
import { Usuario } from '../../domain/entities/usuario.entity';
import { TransactionService } from '@/infrastructure/database/transaction.service';
import { ErrorApp } from '@/domain/lib/error';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepositoryImpl,
        private readonly authRepository: AuthRepositoryImpl,
        private readonly personaRepository: PersonaRepositoryImpl,
        private readonly rolUsuarioRepository: RolUsuarioRepositoryImpl,
        private readonly transaction: TransactionService, // ✅ inyectado
    ) { }

    async createOrUpdate(datos: any): Promise<Usuario> {
        let t;
        try {
            t = await this.transaction.create();
            if (datos.id) delete datos.contrasena;

            if (datos.contrasena) {
                datos.contrasena = await this.authRepository.codificarContrasena(datos.contrasena);
            }

            console.log('datos ', datos)
            //TODO Israel falta realizar correcciones

            /* const existeUsuario = await this.usuarioRepository.verificarCorreoElectronico({
                id: datos.id,
                correoElectronico: datos.correoElectronico,
                usuario: datos.usuario
            }, t); */

            /* datos.persona = {
                // tipoDocumento: datos?.tipoDocumento,
                // numeroDocumento: datos?.numeroDocumento,
                fechaNacimiento: datos?.fechaNacimiento,
                // nombres: datos?.nombres,
                // primerApellido: datos?.primerApellido,
                // segundoApellido: datos?.segundoApellido,
                // telefono: datos?.telefono,
                // celular: datos?.celular,
                // correoElectronico: datos?.correoElectronico
            }; */
            console.log('datos :::: ', datos)


            let persona = null;
            if (datos.persona?.id) {
                persona = await this.personaRepository.createOrUpdate(datos.persona);
            } else {
                persona = await this.personaRepository.findOrCreate({ ...datos.persona, userCreated: datos.userCreated || datos.userUpdated });
            }
            datos.idPersona = persona.id;
            const usuarioCreado = await this.usuarioRepository.createOrUpdate(datos, t);


            if (datos.roles) {
                if (datos.roles.length === 0) throw new Error('Debe asignar al menos un rol al usuario');
                await this.rolUsuarioRepository.deleteItemCond({ idUsuario: usuarioCreado.id });
                for (const rol of datos.roles) {
                    await this.rolUsuarioRepository.createOrUpdate({
                        idUsuario: usuarioCreado.id,
                        idRol: rol,
                        userCreated: datos.userCreated || datos.userUpdated
                    }, t);
                }
            }

            // const result = await this.usuarioRepository.createOrUpdate(new Usuario(null,
            //     datos.usuario, datos.idPersona, datos.idEntidad, datos.contrasena, datos.userCreated), t);
            await this.transaction.commit(t);
            return usuarioCreado;
        } catch (error) {
            console.log("error ", error)
            await this.transaction.rollback(t);
            throw error;
        }
    }

    async actualizar(datos: any): Promise<Usuario> {
        if (!datos.id) {
            throw new Error('El ID es obligatorio para actualizar');
        }
        let t;
        try {
            t = await this.transaction.create();

            const result = await this.usuarioRepository.createOrUpdate(
                new Usuario(
                    datos.id,                     // ✅ AQUÍ YA VA EL ID
                    datos.usuario,
                    datos.idPersona,
                    datos.idEntidad,
                    datos.contrasena,
                    datos.userCreated
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

    async findOne(params): Promise<Usuario> {
        try {
            const respuesta = await this.usuarioRepository.findOne(params);
            return respuesta
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async eliminar(id: number): Promise<number> {
        try {
            const respuesta = await this.usuarioRepository.deleteItem(id);
            return respuesta
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }

    async listar(params): Promise<{ count: number; rows: Usuario[] }> {
        try {
            const respuesta = await this.usuarioRepository.findAll(params);
            return respuesta
        } catch (error) {
            throw new ErrorApp(error.message, 400);
        }
    }
}

