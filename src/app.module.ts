import { Module, NestModule, OnModuleInit, MiddlewareConsumer } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/database/sequelize.config';
import { Sequelize } from 'sequelize-typescript';
import { setupAssociations } from './infrastructure/database/associations';
import { IpInfoMiddleware } from './application/lib/ip';

// MODELS
import { ClienteModel } from './infrastructure/database/models/cliente.model';
import { UsuarioModel } from './infrastructure/database/models/usuario.model';
// CONTROLLERS
import { UsuarioController } from './presentation/controllers/usuario.controller';
import { ClienteController } from './presentation/controllers/cliente.controller';

// REPOSITORIES
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository.impl';
import { ClienteRepositoryImpl } from './infrastructure/repositories/cliente.repository.impl';

// SERVICES ✅⬅️ ESTO FALTABA
import { UsuarioService } from './application/services/usuario.service';

// ✅ TRANSACTION SERVICE
import { GenericRepository } from './infrastructure/database/generic.repository';
import { TransactionService } from './infrastructure/database/transaction.service';
import { PersonaModel } from './infrastructure/database/models/persona.model';
import { ParametroModel } from './infrastructure/database/models/parametro.model';
import { ParametroController } from './presentation/controllers/parametro.controller';
import { ParametroService } from './application/services/parametro.service';
import { ParametroRepositoryImpl } from './infrastructure/repositories/parametro.repository.impl';
import { AuthModel } from './infrastructure/database/models/auth.model';
import { MenuModel } from './infrastructure/database/models/menu.model';
import { MenuRepositoryImpl } from './infrastructure/repositories/menu.repository.impl';
import { MenuService } from './application/services/menu.service';
import { MenuController } from './presentation/controllers/menu.controller';
import { RolModel } from './infrastructure/database/models/rol.model';
import { RolRepositoryImpl } from './infrastructure/repositories/rol.repository.impl';
import { RolService } from './application/services/rol.service';
import { RolController } from './presentation/controllers/rol.controller';
import { PermisoModel } from './infrastructure/database/models/permiso.model';
import { PermisoController } from './presentation/controllers/permiso.controller';
import { PermisoRepositoryImpl } from './infrastructure/repositories/permiso.repository.impl';
import { PermisoService } from './application/services/permiso.service';
import { EntidadModel } from './infrastructure/database/models/entidad.model';
import { RolUsuarioModel } from './infrastructure/database/models/rolUsuario.model';
import { RolMenuModel } from './infrastructure/database/models/rolMenu.model';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { AuthRepositoryImpl } from './infrastructure/repositories/auth.repository.impl';
import { RolPermisoModel } from './infrastructure/database/models/rolPermiso.model';
import { ItemModel } from './infrastructure/database/models/contabilidad/item.model';
import { ItemController } from './presentation/controllers/contabilidad/item.controller';
import { ItemRepositoryImpl } from './infrastructure/repositories/contabilidad/item.repository.impl';
import { ItemService } from './application/services/contabilidad/item.service';
import { RolMenuRepositoryImpl } from './infrastructure/repositories/rolMenu.repository.impl';
import { PersonaRepositoryImpl } from './infrastructure/repositories/persona.repository.impl';
import { RolUsuarioRepositoryImpl } from './infrastructure/repositories/rolUsuario.repository.impl';
import { ChatModule } from './presentation/gateways/chat.module';
import { UsuarioConversacionModel } from './infrastructure/database/models/social/usuarioConversacion.model';
import { UsuarioConversacionController } from './presentation/controllers/social/usuarioConversacion.controller';
import { UsuarioConversacionService } from './application/services/social/usuarioConversacion.service';
import { UsuarioConversacionRepositoryImpl } from './infrastructure/repositories/social/usuarioConversacion.repository.impl';
import { MensajeModel } from './infrastructure/database/models/social/mensaje.model';
import { MensajeController } from './presentation/controllers/social/mensaje.controller';
import { MensajeRepositoryImpl } from './infrastructure/repositories/social/mensaje.repository.impl';
import { MensajeService } from './application/services/social/mensaje.service';
import { ConversacionModel } from './infrastructure/database/models/social/conversacion.model';
import { ConversacionController } from './presentation/controllers/social/conversacion.controller';
import { ConversacionRepositoryImpl } from './infrastructure/repositories/social/conversacion.repository.impl';
import { ConversacionService } from './application/services/social/conversacion.service';
import { ChatGateway } from './presentation/gateways/chat.gateway';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([ClienteModel, UsuarioModel, PersonaModel, ParametroModel, AuthModel, MenuModel, RolModel, PermisoModel,
      EntidadModel, RolModel, RolUsuarioModel, RolMenuModel, RolPermisoModel, ItemModel,
      // Social
      UsuarioConversacionModel,
      MensajeModel,
      ConversacionModel,
    ]), // ✅ agrega UsuarioModel
    //ChatModule
  ],
  controllers: [UsuarioController, ClienteController, ParametroController, MenuController,
    RolController, PermisoController, AuthController, ItemController,
    UsuarioConversacionController, MensajeController, ConversacionController], // ✅ agrega UsuarioController
  providers: [
    GenericRepository,
    ClienteRepositoryImpl,
    UsuarioRepositoryImpl,
    ParametroRepositoryImpl,
    PersonaRepositoryImpl,
    RolUsuarioRepositoryImpl,
    MenuRepositoryImpl,
    RolRepositoryImpl,
    RolMenuRepositoryImpl,
    PermisoRepositoryImpl,
    AuthRepositoryImpl,
    ItemRepositoryImpl,
    UsuarioConversacionRepositoryImpl,
    MensajeRepositoryImpl,
    ConversacionRepositoryImpl,

    UsuarioService,   // ✅ OBLIGATORIO
    ParametroService,
    MenuService,
    RolService,
    PermisoService,
    AuthService,
    ItemService,
    ConversacionService,

    UsuarioConversacionService,
    MensajeService,
    ChatGateway,
    // ClienteService,   // ✅ si lo estás usando,
    TransactionService     // ✅ ESTE ERA EL QUE FALTABA
  ],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(private sequelize: Sequelize) { }

  onModuleInit() {
    setupAssociations();            // ⬅️ SE LLAMA AQUÍ
    this.sequelize.sync();          // opcional
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpInfoMiddleware)
      .forRoutes('*')
  }

}