import { Test} from '@nestjs/testing';
import { PostController,AuthController } from '../index';
import { AuthService,UserService,PostService } from '../../services/index';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import mockedUser from './user.mock';
import { IUser} from 'src/interfaces';
import mockedConfigService from './config.service.mock';
import { User } from '@prisma/client';
import { PrismaService } from '../../services/prisma.service';

describe('AuthController', () => {
  let app: INestApplication;
  let createUserMock: jest.Mock;
  let userData: Partial<IUser>;

  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    const httpResponse = (message: string, data: any = null) => {
      return {
        success: true,
        message,
        data,
      };
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: createUserMock,
            },
          },
        },
     
        // {
        //   provide: ConfigService,
        //   useValue: mockedConfigService,
        // },
        // {
        //   provide: JwtService,
        //   useValue: mockedJwtService,
        // },
        // {
        //   provide: getRepositoryToken(IUser),
        //   useValue: httpResponse,
        // },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          ...userData,
        };
        delete expectedData.password;
        return request(app.getHttpServer())
          .post('/api/v1/register')
          .send({
            email: mockedUser.email,
            username: mockedUser.username,
            password: 'strongPassword',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            username: mockedUser.username,
          })
          .expect(400);
      });
    });
  });


});



