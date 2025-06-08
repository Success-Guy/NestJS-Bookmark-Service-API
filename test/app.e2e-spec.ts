import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { error } from 'console';

describe('AppController (e2e)', () => {
  // it.todo('test e2e ')
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('Sign up', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .query({ email: 'sammy@gmail.com', password: 'sdasdaskjfnsdjfnsj' })
      .expect(200)
  });
  it('Get user - me', () => {
    return request(app.getHttpServer())
      .get('/users/me')
      .auth("sammy@gmail.com", "sdasdaskjfnsdjfnsj",{type: "basic"})
      .set("Header", "Authorization Bearer jdcbfsdfjknfksdj")
      // .expect(401)
    // .expect('Hello World!');
  });
});
