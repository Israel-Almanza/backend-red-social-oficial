import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';

export class CrearUsuarioUseCase {
  constructor(private repo: UsuarioRepository) {}

  execute(usuario: string, idPersona: number, idEntidad: number, contrasena: string, userCreated: number) {
    const _usuario = new Usuario(0, usuario, idPersona, idEntidad, contrasena, userCreated);
    return this.repo.createOrUpdate(_usuario);
  }
}
