import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  app.enableCors({
    origin: { origin: 'http://localhost:3000' },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });
  await app.listen(port ?? 3031);
  console.log(`Server start on port ${port}`);
}
void bootstrap();
