module.exports = function (plop) {
    plop.setGenerator('controller', {
        description: 'Crear un controller con tu plantilla',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nombre del controller'
            }
        ],

        actions: [
            {
                type: 'add',
                path: 'src/presentation/controllers/{{name}}.controller.ts',
                templateFile: 'src/plop-templates/controller.hbs'
            }
        ]
    });

    // ---------------------------------------------------------
    // 2️⃣ GENERADOR DE SERVICES
    // ---------------------------------------------------------
    plop.setGenerator('service', {
        description: 'Crear un service con transacciones, repositorios y entidad',
        prompts: [
            {
                type: 'input',
                name: 'fields',
                message: 'Campos de la entidad separados por coma (ej: grupo,codigo,nombre,descripcion):',
                filter: v => v.split(',').map(f => f.trim())
            }
        ],

        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error("Debes usar --name NOMBRE");
            }

            data.name = argv.name;

            return [
                {
                    type: 'add',
                    path: 'src/application/services/{{name}}.service.ts',
                    templateFile: 'src/plop-templates/service.hbs'
                }
            ];
        }
    });

    // REPOSITORY IMPLEMENTATION
    plop.setGenerator('repositoryImpl', {
        description: 'Crear implementación del repositorio (Infrastructure)',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nombre del repositorio'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/infrastructure/repositories/{{name}}.repository.impl.ts',
                templateFile: 'src/plop-templates/repositoryImpl.hbs'
            }
        ]
    });
    // REPOSITORY
    plop.setGenerator('repository', {
        description: 'Crear implementación del repositorio (Domain)',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nombre del repository'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/domain/repositories/{{name}}.repository.ts',
                templateFile: 'src/plop-templates/repository.hbs'
            }
        ]
    });

    // Model

    plop.setGenerator('model', {
        description: 'Crear modelo Sequelize (sequelize-typescript)',
        prompts: [
            {
                type: 'input',
                name: 'fields',
                message:
                    'Campos (ej: grupo:string,codigo:string,otros:string?,nombre:string,descripcion:text,estado:enum)',
            },
        ],

        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error('Debes usar --name NOMBRE');
            }

            data.name = argv.name;

            // 🔥 AQUÍ SE TRANSFORMAN LOS CAMPOS CORRECTAMENTE
            data.fields = data.fields.split(',').map((field) => {
                const [name, rawType] = field.split(':');

                const nullable = rawType.endsWith('?');
                const type = nullable ? rawType.slice(0, -1) : rawType;

                const map = {
                    string: {
                        type: 'STRING',
                        tsType: 'string',
                    },
                    text: {
                        type: 'TEXT',
                        tsType: 'string | null',
                    },
                    enum: {
                        type: "ENUM('ACTIVO','INACTIVO')",
                        tsType: "'ACTIVO' | 'INACTIVO'",
                    },
                };

                return {
                    name,
                    type: map[type]?.type || 'STRING',
                    tsType: map[type]?.tsType || 'string',
                    allowNull: nullable,
                };
            });

            return [
                {
                    type: 'add',
                    path: 'src/infrastructure/database/models/{{name}}.model.ts',
                    templateFile: 'src/plop-templates/model.hbs',
                },
            ];
        },
    });

    // Entity 
    plop.setGenerator('entity', {
        description: 'Crear entidad de dominio (DDD)',
        prompts: [
            {
                type: 'input',
                name: 'fields',
                message: 'Campos de la entidad (ej: grupo:string,codigo:string,nombre:string,descripcion:string?)',
            },
        ],

        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error('Debes usar --name NOMBRE');
            }

            data.name = argv.name;

            // 🔥 Transformación de campos
            data.fields = data.fields.split(',').map((field) => {
                const [name, rawType] = field.split(':');

                const nullable = rawType.endsWith('?');
                const type = nullable ? rawType.slice(0, -1) : rawType;

                return {
                    name,
                    tsType: nullable ? `${type} | null` : type,
                };
            });

            return [
                {
                    type: 'add',
                    path: 'src/domain/entities/{{name}}.entity.ts',
                    templateFile: 'src/plop-templates/entity.hbs',
                },
            ];
        },
    });

    // CRUD COMPLETO 

    plop.setGenerator('crud', {
        description: 'Crear CRUD completo (DDD)',
        prompts: [
            {
                type: 'input',
                name: 'fields',
                message:
                    'Campos (ej: grupo:string,codigo:string,nombre:string,descripcion:string?)',
            },
        ],

        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error('Debes usar --name NOMBRE');
            }

            data.name = argv.name;

            // =========================
            // TRANSFORMACIÓN DE CAMPOS
            // =========================

            const rawFields = data.fields.split(',').map(f => f.trim());

            data.entityFields = rawFields.map((field) => {
                const [name, rawType] = field.split(':');
                const nullable = rawType.endsWith('?');
                const type = nullable ? rawType.slice(0, -1) : rawType;

                return {
                    name,
                    tsType: nullable ? `${type} | null` : type,
                };
            });

            data.modelFields = rawFields.map((field) => {
                const [name, rawType] = field.split(':');
                const nullable = rawType.endsWith('?');
                const type = nullable ? rawType.slice(0, -1) : rawType;

                const map = {
                    string: {
                        type: 'STRING',
                        tsType: 'string',
                    },
                    text: {
                        type: 'TEXT',
                        tsType: 'string | null',
                    },
                    enum: {
                        type: "ENUM('ACTIVO','INACTIVO')",
                        tsType: "'ACTIVO' | 'INACTIVO'",
                    },
                };

                return {
                    name,
                    type: map[type]?.type || 'STRING',
                    tsType: map[type]?.tsType || 'string',
                    allowNull: nullable,
                };
            });

            return [
                // ENTITY
                {
                    type: 'add',
                    path: 'src/domain/entities/{{name}}.entity.ts',
                    templateFile: 'src/plop-templates/entity.hbs',
                    data: { fields: data.entityFields },
                },

                // REPOSITORY (INTERFACE)
                {
                    type: 'add',
                    path: 'src/domain/repositories/{{name}}.repository.ts',
                    templateFile: 'src/plop-templates/repository.hbs',
                },

                // MODEL
                {
                    type: 'add',
                    path: 'src/infrastructure/database/models/{{name}}.model.ts',
                    templateFile: 'src/plop-templates/model.hbs',
                    data: { fields: data.modelFields },
                },

                // REPOSITORY IMPL
                {
                    type: 'add',
                    path: 'src/infrastructure/repositories/{{name}}.repository.impl.ts',
                    templateFile: 'src/plop-templates/repositoryImpl.hbs',
                },

                // SERVICE
                {
                    type: 'add',
                    path: 'src/application/services/{{name}}.service.ts',
                    templateFile: 'src/plop-templates/service.hbs',
                },

                // CONTROLLER
                {
                    type: 'add',
                    path: 'src/presentation/controllers/{{name}}.controller.ts',
                    templateFile: 'src/plop-templates/controller.hbs',
                },
            ];
        },
    });

};
