import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { User } from 'src/common/user/Domain/User';

@Controller('barCode')
export class BarCodeController {
  constructor(private readonly verifyJwtService: VerifyJwtService) {}

  @Post('profile')
  async postProfile(@Req() request: Request) {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        const user = decoded as User;
        return { user };
      }
    }
    return { message: 'no jwt' };
  }
}
