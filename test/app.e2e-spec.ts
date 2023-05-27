import * as request from 'supertest';
import { Test,TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthController, PostController } from 'src/controllers';
import { AuthService, PostService, UserService } from 'src/services';
import mongoose from 'mongoose';
import { MONGODB_URI_TEST } from 'src/configs';
import { User } from 'src/models';

describe('AuthController (e2e)', () => {
  const userData ={
    email:'oihimekpe.n@gmail.com',
    password:'Admin@123',
    username:'TestUserName'
  }
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture:TestingModule = await Test.createTestingModule({
      controllers: [PostController,AuthController],
      providers: [AuthService,UserService,PostService ],
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    mongoose.connect(MONGODB_URI_TEST)
  });

 
  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
    await app.close();
    
  });
  describe('Auth', () => {
    afterEach(async () => await User.deleteMany());
    const endPoint = '/api/v1/register';
    it('Signup successfully', () => {
      return request(app.getHttpServer())
        .post(endPoint)
        .send(userData)
        .expect(200)
        // .expect('Hello World!');
    });
  });
  
});
