import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';
import { Urlshortner } from './url-shortner.schema';

@Controller('url-shortner')
export class UrlShortnerController {
    constructor(private readonly urlService:UrlShortnerService) {}

    @Post('/create')
    async createStudent(@Body() data:Partial<Urlshortner>) {
        return this.urlService.createUrlTodo(data);
    }

    @Get('/getAll')
    async getAllStudents() {
        return this.urlService.getUrlsTodos();
    }
}
