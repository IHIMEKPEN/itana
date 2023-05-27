import {Request,Response, Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/interfaces';
import { httpResponse } from 'src/utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/v1/register')
  async register(@Body() userData: Partial<IUser>): Promise<any> {
    let user :Partial<IUser>= await this.authService.register(userData);
    user = _.pick(user,  'email', 'isVerified');
    return httpResponse('user registration successful', { user})
    // res.status(200)
    //   .json(httpResponse('user registration successful', { user: filtered }));
  }

  @Post('/api/v1/login')
 async login(@Body() userData: Partial<IUser>): Promise<any> {
    let {token,user}= await this.authService.login(userData);
    return httpResponse('loggin successful', { token})
  }
  
  @Get()
 health(): string {
  return 'APIs running'

  }
}
