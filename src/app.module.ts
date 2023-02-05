import { Module } from '@nestjs/common';
import { AppController, TesteController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, TesteController],
  providers: [AppService],
})
export class AppModule {}
