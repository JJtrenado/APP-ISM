import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GarmentDocument = HydratedDocument<Garment>;

@Schema()
export class Garment {
  @Prop({ required: true })
  user: string;

  @Prop({ unique: true })
  barCode: string;

  @Prop()
  imagePath: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  available: boolean;
}

export const GarmentSchema = SchemaFactory.createForClass(Garment);
