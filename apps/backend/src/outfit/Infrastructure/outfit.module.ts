import { Module } from '@nestjs/common';
import { OutfitController } from './outfit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Outfit, OutfitSchema } from '../Domain/outfit.schema';
import { OutfitService } from '../Application/outfit.service';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Outfit.name, schema: OutfitSchema }]),
    MongooseModule.forRoot(
      `mongodb+srv://trenadojuanjo:${process.env.DB_ADMIN_PASSWORD}@cluster0.vo0rone.mongodb.net/outfitme?retryWrites=true&w=majority`,
    ),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '9999 years' },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [OutfitController],
  providers: [OutfitService, VerifyJwtService],
})
export class OutfitModule {}
