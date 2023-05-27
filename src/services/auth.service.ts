import { Injectable } from '@nestjs/common';
import {APP_NAME} from '../configs'
import {
  AppError,
  codeGenerator,
  compareHash,
  DuplicateKeyError,
  hashData,
  logger,
  signToken,
  ValidationError,
} from '../utils';
import { UserService } from './index';
import { IUser } from 'src/interfaces';
@Injectable()
export class AuthService {
  private readonly userService = new UserService();

  public async register(userData:  Partial<IUser>): Promise<IUser> {
    let {email,password,username}=userData
    if (!password) throw new ValidationError('password field is required', 'password', '', 'password-required');
    if (!email) throw new ValidationError('email address field is required', 'email', '', 'email-required');
    if (!username) throw new ValidationError('username address field is required', 'username', '', 'username-required');
    let user = await this.userService.findOne({ email } );
    if (user) throw new DuplicateKeyError('', 'email', email);
    user = await this.userService.findOne({ username } );
    if (user) throw new DuplicateKeyError('username exist', 'username', username);
    password= await hashData(password);
    user = await this.userService.create({  email, password,username });
    //send email--if required
    
    return user;
  }
  async login({ email, password }: Partial<IUser>): Promise<{token:string,user:IUser}> {
    if (!password) throw new ValidationError('password field is required', 'password', '', 'password-required');
    if (!email) throw new ValidationError('email address field is required', 'email', '', 'email-required');
   
    let user = await this.userService.findOne({ email });
    if (!user) {
      const error_message = `the email or password provided is incorrect`;
      const solution = 'try providing a valid email and password';
      throw new ValidationError(error_message, 'email', solution, 'user-not-found');
    }

    if (user && !(await compareHash(password, user.password))) {
      const error_message = `the email or password provided is incorrect`;
      const solution = 'try providing a valid email and password';
      throw new ValidationError(error_message, 'password', solution, 'password-incorrect');
    }
    // console.log(user)
    const token = signToken(user);
    return {token,user};
  }
}
