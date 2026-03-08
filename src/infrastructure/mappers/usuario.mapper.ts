import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioModel } from '../database/models/usuario.model';

export class UsuarioMapper {
  static toDomain(model: UsuarioModel): Usuario {
    return null
    // return new Usuario(model.id, model.usuario, model.idPersona, model.idEntidad, model.contrasena, model.userCreatesd);
  }
}
