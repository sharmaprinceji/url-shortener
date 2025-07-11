import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Urlshortner & Document;

@Schema({ timestamps: true })
export class Urlshortner {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  clicks: number;
}

export const URLSchema = SchemaFactory.createForClass(Urlshortner);
