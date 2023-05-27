import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService, PostService, } from './services/index';
import { PostController } from './controllers/post.controller';
import { authMiddleware } from './middlewares';
@Module({
  imports: [],
  controllers: [AuthController,PostController],
  providers: [AuthService,PostService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware.use)
      .forRoutes('/api/v1/post' 
      // method: RequestMethod.GET 
    );
  }
}
