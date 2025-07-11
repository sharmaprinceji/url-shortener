import { Module } from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';
import { UrlShortnerController } from './url-shortner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Urlshortner, URLSchema } from './url-shortner.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard, JwtStrategy } from './auth/jwt-auth.gaurd';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Urlshortner.name, schema: URLSchema }]),
    PassportModule,
    AuthModule,
  ],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService, JwtAuthGuard, JwtStrategy],
})
export class UrlShortnerModule {}
