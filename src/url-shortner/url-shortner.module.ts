import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLSchema, Urlshortner } from './url-shortner.schema';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortnerService } from './url-shortner.service';

@Module({
    imports: [ MongooseModule.forFeature([
      { name: Urlshortner.name, schema: URLSchema },
    ]),],
    controllers: [UrlShortnerController],
    providers: [UrlShortnerService],
    exports: [UrlShortnerService]
})
export class UrlShortnerModule {}
