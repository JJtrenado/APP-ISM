import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../common/user/Domain/User';

@Injectable()
export class generateJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async withUser(user: User): Promise<{ jwt: string }> {
    const jwt = this.jwtService.sign(user);
    return { jwt };
  }
}
