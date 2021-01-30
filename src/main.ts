import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { configService } from './common/config/config.service';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AllExceptionsFilter } from './common/exception/http-exception.filter';

const port = configService.getPort();
const apiPrefix = configService.getApiPrefix();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error']
  });

  app.use(morgan('dev'));
  app.enableCors(); // use config options with domain here

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
      dismissDefaultMessages: true
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix(apiPrefix);

  await app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}
bootstrap();
