import { Request, Response, Body, Controller, Get, Post, Patch, Param,UseInterceptors,  CacheInterceptor, } from '@nestjs/common';
import { PostService, UserService } from '../services';
import { httpResponse } from 'src/utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';
import { IUserRequest } from 'src/middlewares';


@Controller()
export class UserController {
  constructor(private readonly postService: PostService, private readonly userService: UserService) { }

  @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  @Patch('/api/v1/user/:userID/act')
  async userAct(@Request() req: IUserRequest, @Response() res: IResponse,@Param() params: { userID: string }): Promise<void> {
    let user = req.user
    let data = {
      user,
      userID: params.userID,
      
    }
    let post = await this.userService.userAct(data);

    res.status(200)
      .json(httpResponse('post created', { post }));
  }

 

}
