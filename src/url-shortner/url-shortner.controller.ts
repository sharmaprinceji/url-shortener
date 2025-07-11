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
  UseGuards,
} from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';
import { CreateUrlDto } from './dto/create-url.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.gaurd';

@ApiTags('URL Shortener')
@ApiBearerAuth()
@Controller()
export class UrlShortnerController {
  constructor(private readonly urlService: UrlShortnerService) {}

  @Post('api/shorten')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a shortened URL' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({ status: 201, description: 'URL shortened successfully !' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async shorten(@Body() body: CreateUrlDto) {
    return this.urlService.shortenUrl(body.originalUrl, body.shortCode);
  }

  @Get('r/:shortCode')
  @HttpCode(302)
  @ApiOperation({ summary: 'Redirect to original URL' })
  @ApiParam({ name: 'shortCode', required: true, description: 'Short URL code' })
  @ApiResponse({ status: 302, description: 'Redirects to original URL' })
  async redirect(@Param('shortCode') code: string, @Res() res: Response) {
    const url = await this.urlService.redirect(code);
    return res.redirect(url);
  }

  @Get('api/stats/:shortCode')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get stats for a short URL' })
  @ApiParam({ name: 'shortCode', required: true, description: 'Short URL code' })
  @ApiResponse({ status: 200, description: 'Stats returned successfully !' })
  async stats(@Param('shortCode') code: string) {
    return this.urlService.getStats(code);
  }

  @Post('api/create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a shortened URL with schema validation !' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({ status: 201, description: 'URL created with validation !' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createWithSchema(@Body() data: CreateUrlDto) {
    return this.urlService.createShortUrl(data);
  }
}
