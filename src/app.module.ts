import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortnerModule } from './url-shortner/url-shortner.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UrlShortnerModule,ConfigModule.forRoot({
    isGlobal: true, 
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI!),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
