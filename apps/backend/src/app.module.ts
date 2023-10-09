import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';
import { GarmentModule } from './garment/Infrastructure/garment.module';
import { OutfitModule } from './outfit/Infrastructure/outfit.module';

@Module({
  imports: [AuthModule, GarmentModule, OutfitModule],
})
export class AppModule {}
