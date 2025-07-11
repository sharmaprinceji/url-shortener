import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('URL')
@Controller()
export class UrlShortnerController {
  constructor(private readonly urlService: UrlShortnerService) {}

  @Post('api/shorten')
  @ApiBody({ type: CreateUrlDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponse({ status: 201, description: 'URL shortened' })
  async shorten(@Body() body: CreateUrlDto) {
    return this.urlService.shortenUrl(body.originalUrl, body.shortCode);
  }

  @Get('r/:shortCode')
  @HttpCode(302)
  @ApiResponse({ status: 302, description: 'Redirects to original URL' })
  async redirect(@Param('shortCode') code: string, @Res() res: Response) {
    const url = await this.urlService.redirect(code);
    return res.redirect(url);
  }

  @Get('api/stats/:shortCode')
  @ApiResponse({ status: 200, description: 'Stats returned' })
  async stats(@Param('shortCode') code: string) {
    return this.urlService.getStats(code);
  }

  @Post('api/create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createWithSchema(@Body() data: CreateUrlDto) {
    return this.urlService.createShortUrl(data);
  }
}
