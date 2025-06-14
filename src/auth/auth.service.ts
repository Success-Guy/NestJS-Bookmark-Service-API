import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "src/generated/prisma/internal/prismaNamespace";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signup(dto: SignUpDto) {
    // console.log(dto);
    //generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the user into db and return the saved user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstname,
          lastName: dto.lastname,
          hash
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true
        // }
      });
      return this.signToken(user.id, user.email);

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exist');
        }
        throw error;
      }
    }
  }
  async signin(dto: SignInDto) {
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

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }
    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    });

    return {
      access_token: token,
    };
  }
}
