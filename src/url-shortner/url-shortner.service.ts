import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { UrlDocument, Urlshortner } from './url-shortner.schema';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectModel(Urlshortner.name)
    private readonly urlModel: Model<UrlDocument>,
  ) {}

  async createShortUrl(data: Partial<Urlshortner>): Promise<Urlshortner> {
    let shortCode = data.shortCode;

    if (shortCode) {
      const exists = await this.urlModel.findOne({ shortCode });
      if (exists) throw new ConflictException('Short code already in use');
    } else {
      do {
        shortCode = nanoid(6);
      } while (await this.urlModel.findOne({ shortCode }));
    }

    const newUrl = new this.urlModel({
      originalUrl: data.originalUrl,
      shortCode,
    });

    return newUrl.save();
  }

  async shortenUrl(originalUrl: string, customCode?: string) {
    let shortCode = customCode || nanoid(6);

    const exists = await this.urlModel.findOne({ shortCode });
    if (exists) throw new ConflictException('Short code already in use');

    const newUrl = new this.urlModel({ originalUrl, shortCode });
    await newUrl.save();

    return {
      originalUrl,
      shortUrl: `${process.env.BASE_URL}/r/${shortCode}`,
    };
  }

  async redirect(shortCode: string): Promise<string> {
    const urlDoc = await this.urlModel.findOne({ shortCode });
    if (!urlDoc) throw new NotFoundException('Short URL not found');

    urlDoc.clicks += 1;
    await urlDoc.save();
    return urlDoc.originalUrl;
  }

  async getStats(shortCode: string) {
    const urlDoc = await this.urlModel.findOne({ shortCode });
    if (!urlDoc) throw new NotFoundException('Short URL not found');

    return {
      originalUrl: urlDoc.originalUrl,
      shortUrl: `${process.env.BASE_URL}/r/${shortCode}`,
      clicks: urlDoc.clicks,
    };
  }
}
