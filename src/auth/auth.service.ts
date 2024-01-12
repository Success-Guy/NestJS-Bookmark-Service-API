import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async signup(dto: AuthDto) {
    console.log(dto);
    //generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the user into db and return the saved user
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        },
        select: {
          id: true,
          email: true,
          createdAt: true
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exist');
        }
        throw error;
      }
    }


  }
  async signin(dto: AuthDto) {
    console.log(dto);
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) throw new ForbiddenException('Incorrect credentials');
    const pwdMatches = await argon.verify(user.hash, dto.password);
    if (!pwdMatches) throw new ForbiddenException('Incorrect credentials');

    delete user.hash;
    return user;
  }
}
