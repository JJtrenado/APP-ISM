import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { BarCodeController } from './barCode.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [BarCodeController],
  providers: [VerifyJwtService],
})
export class BarCodeModule {}
