import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from 'src/generated/prisma/client';


@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule  extends PrismaClient{}
