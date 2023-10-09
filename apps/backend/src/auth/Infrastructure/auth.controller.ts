import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { generateJwtService } from './generateJwt.service';
import { getUser } from '../Application/getUser.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly GenerateJwtService: generateJwtService,
    private readonly GetUser: getUser,
  ) {}

  @Get('getJwtFromGoogleToken')
  async getJwtFromGoogleToken(
    @Query('token') token: string,
    @Res() response: Response,
  ) {
    const { user } = await this.GetUser.fromToken(token);
    if (user) {
      const jwt = await this.GenerateJwtService.withUser(user);
      response.status(HttpStatus.OK).send(jwt);
    } else {
      response.status(HttpStatus.BAD_REQUEST).json({ Token: 'Invalid Token' });
    }
  }
}
