import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortnerService } from './url-shortner.service';
import { UrlShortnerController } from './url-shortner.controller';
import { Urlshortner, URLSchema } from './url-shortner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Urlshortner.name, schema: URLSchema },
    ]),
  ],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService],
})
export class UrlShortnerModule {}
