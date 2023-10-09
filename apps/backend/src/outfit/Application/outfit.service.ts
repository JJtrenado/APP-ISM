import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Outfit } from '../Domain/outfit.schema';
import { CreateOutfitDto } from './create-outfit.dto';

@Injectable()
export class OutfitService {
  constructor(@InjectModel(Outfit.name) private outfitModel: Model<Outfit>) {}

  async create(createOutfitDto: CreateOutfitDto): Promise<Outfit> {
    const createdOutfit = new this.outfitModel(createOutfitDto);
    return createdOutfit.save();
  }

  // async findAll(): Promise<Outfit[]> {
  //   return this.outfitModel.find().exec();
  // }

  // async findByUser(userId: string): Promise<Outfit[]> {
  //   return this.outfitModel.find({ user: userId }).exec();
  // }
}
