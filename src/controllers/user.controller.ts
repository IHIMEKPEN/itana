import { Request, Response, Body, Controller, Get, Post, Patch, Param,UseInterceptors,  CacheInterceptor, } from '@nestjs/common';
import {  UserService } from '../services';
import { httpResponse } from '../utils';
import _ from 'underscore';
import { Response as IResponse} from 'express';
import { IUserRequest } from 'src/middlewares';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Patch('/api/v1/user/:userID/act')
  public async userAct(@Request() req: Partial<IUserRequest>, @Response() res: Partial<IResponse>,@Param() params: { userID: string }): Promise<void> {
    let user = req.user
    let data = {
      user,
      userID: params.userID,
      
    }
    let post = await this.userService.userAct(data);

    res.status(200)
      .json(httpResponse('user follows updated', { post }));
  }

 

}
