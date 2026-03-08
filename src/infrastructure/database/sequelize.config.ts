import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ClienteModel } from './models/cliente.model';
import { UsuarioModel } from './models/usuario.model';
import { PersonaModel } from './models/persona.model';
import { EntidadModel } from './models/entidad.model';
import { RolModel } from './models/rol.model';
import { RolUsuarioModel } from './models/rolUsuario.model';
import { MenuModel } from './models/menu.model';
import { RolMenuModel } from './models/rolMenu.model';
import { PermisoModel } from './models/permiso.model';
import { RolPermisoModel } from './models/rolPermiso.model';
import { ParametroModel } from './models/parametro.model';
import { AuthModel } from './models/auth.model';
import { ItemModel } from './models/contabilidad/item.model';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'publica',
  database: 'db_social',
  /* models: [
    UsuarioModel,
    PersonaModel,
    EntidadModel,
    RolModel,
    RolUsuarioModel,
    RolMenuModel,
    RolPermisoModel,
    MenuModel,
    PermisoModel,
    ClienteModel,
    ParametroModel,
    AuthModel,
    ItemModel
  ], */
  autoLoadModels: true,
  synchronize: true,
  logging: false
};