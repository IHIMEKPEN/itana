import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_NAME, CLIENT_URL, ENVIRONMENT, MONGODB_URI, PORT, db } from './configs';
import { logger } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT,async () => {
    logger.info(
      `😀 ${APP_NAME} server running on '${ENVIRONMENT}' environment, port '${PORT}'`
    );
    await db.connectMongoDB(MONGODB_URI);
  });
 
}
bootstrap();
