import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_KEY } from '../configs';
import { IUser } from '../interfaces';
import { UserService } from '../services';
import { AppError, AuthError, asyncWrapper } from '../utils';
import { Injectable, NestMiddleware } from '@nestjs/common';

export interface IUserRequest extends Request {
  user?: IUser;
  foundUser?: IUser;

}

@Injectable()
export class AuthMiddleare implements NestMiddleware {
 
  constructor() { }

  async use(req: IUserRequest, res: Response, next: NextFunction) {
    let userService = new UserService();
    let token: any = '';
    if (req.headers.token) {
      token = req.headers.token;
    }


    if (!token) {
      const errorMessage = 'user not authenticated';
      const possibleSolution = 'login and try again';
      return next(new AuthError(errorMessage, 'token', possibleSolution));
    }

    const payload = <IUser>verify(token, JWT_KEY);
    const _user = await userService.get(payload._id);

    if (!_user) {
      const errorMessage = 'invalid or expired token provided';
      const possibleSolution = 'login and try again';
      return next(new AuthError(errorMessage, 'token', possibleSolution));
    }

    req.user = _user;
    next();
  }
}
export const authMiddleware = new AuthMiddleare();
