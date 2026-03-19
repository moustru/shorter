import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.enableCors({
    origin: [
      'http://5.42.126.153',      // без порта (80)
      'http://5.42.126.153:8080',  // с портом 8080
      'http://localhost:8080',     // для разработки
      'http://localhost'           // для разработки
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
});

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
