import { Injectable } from '@nestjs/common';
import { UrlDocument, Urlshortner } from './url-shortner.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UrlShortnerService {
    constructor(
        @InjectModel(Urlshortner.name) private readonly urlModel: Model<UrlDocument>, // Replace 'any' with your actual model type
    ) {
        // Initialization logic if needed
    }

    async getUrlsTodos(): Promise<Urlshortner[]> {
        return this.urlModel.find().exec();
    }

    async createUrlTodo(urlData: Partial<Urlshortner>): Promise<Urlshortner> {
        const newurl = new this.urlModel(urlData);
        return newurl.save();
    }
}
