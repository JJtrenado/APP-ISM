import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OutfitDocument = HydratedDocument<Outfit>;

@Schema()
export class Outfit {
  @Prop()
  user: string;

  @Prop()
  cabezaBarCode: string;

  @Prop()
  torsoBarCode: string;

  @Prop()
  piernasBarCode: string;

  @Prop()
  piesBarCode: string;

  @Prop()
  available: boolean;
}

export const OutfitSchema = SchemaFactory.createForClass(Outfit);
