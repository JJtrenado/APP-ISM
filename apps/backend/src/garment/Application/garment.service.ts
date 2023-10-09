import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Garment } from '../Domain/garment.schema';
import { CreateGarmentDto } from './create-garment.dto';

@Injectable()
export class GarmentService {
  constructor(
    @InjectModel(Garment.name) private garmentModel: Model<Garment>,
  ) {}

  async create(createGarmentDto: CreateGarmentDto): Promise<Garment> {
    const createdGarment = new this.garmentModel(createGarmentDto);
    return createdGarment.save();
  }

  async findAll(): Promise<Garment[]> {
    return this.garmentModel.find().exec();
  }

  async findByUser(userId: string): Promise<Garment[]> {
    return this.garmentModel.find({ user: userId }).exec();
  }

  async deleteByBarCode(barCode: string): Promise<boolean> {
    try {
      const deletedGarment = await this.garmentModel.findOneAndDelete({
        barCode,
      });

      if (deletedGarment) return true;
      throw new NotFoundException('Prenda no encontrada');
    } catch (error) {
      console.error('Error deleting garment by barCode:', error);
      return false;
    }
  }

  async updateAvailabilityByBarCode(
    barCode: string,
    available: boolean,
  ): Promise<Garment | null> {
    const garment = await this.garmentModel.findOne({ barCode }).exec();
    if (garment) {
      garment.available = available;
      return garment.save();
    }
    return null;
  }
}
