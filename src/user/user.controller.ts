import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/generated/prisma/client';

@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User){
    return user;
  }
}
