import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'src/generated/prisma/client';


@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL')
        }
      }
    });
  }
  // empty user table
  public async cleanUser(): Promise<void> {
    await this.$transaction([
      this.user.deleteMany()
    ]);
  }

}
