import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // ✅ CONFIGURACIÓN DE SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Sistema Contable API')
    .setDescription('Documentación del sistema contable')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // ✅ RUTA: /api

  // await app.listen(3000);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
