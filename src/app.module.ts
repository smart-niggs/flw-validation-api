import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ // load .env variables
      isGlobal: true, // you will not need to import ConfigModule in other modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
}
