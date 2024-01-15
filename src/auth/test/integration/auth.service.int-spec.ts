import { Test } from "@nestjs/testing";
import { IsString } from "class-validator";
import { AppModule } from "src/app.module";
import { AuthService } from "src/auth/auth.service";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";

describe('Authentication test', () => {
  let prisma: PrismaService;
  let auth: AuthService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    prisma = moduleRef.get(PrismaService);
    auth = moduleRef.get(AuthService);
    await prisma.cleanUser();
  });

  describe('create user', () => {
    const dto: AuthDto = {
      email: 'lkjhg@gmail.com',
      password: 'asdffsdkndknf'
    }
    it('Sign up', async () => {
      const authuser = await auth.signup(dto);
      expect(typeof(authuser.access_token)).toBe('string')
    })
    it.todo('Sign in')
  })
  describe('User ', () => {
    it.todo('Verify user');
  })
});