import { MiddlewareConsumer, Module, CacheStore } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService, PostService, UserService, } from './services/index';
import { PostController } from './controllers/post.controller';
import { authMiddleware } from './middlewares';
import { UserController } from './controllers';
import redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [CacheModule.register(
  //   {
  // //   isGlobal: true,
  //   store: redisStore as unknown as CacheStore,
  //   host: 'localhost',
  //   port: 6379,
  // //   // password:'redisPassword'
  //  }
  ),],
  controllers: [AuthController,PostController,UserController],
  providers: [AuthService,PostService,UserService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware.use)
      .forRoutes('/api/v1/post','/api/v1/user');
  }
}
