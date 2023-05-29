// import { User } from '../models';
import { IUser } from '../interfaces';
import { AppError, compareHash, hashData, signToken, ValidationError } from '../utils';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import { User } from '@prisma/client';

/** User Service class */
@Injectable()
export class UserService {
  private readonly prisma = new PrismaService()
  constructor(


  ) { }

  /**
   * @method create
   * @param userData user data
   * @return {Promise} IUser | Error
   */
  public async create(userData: any): Promise<any> {
    const user = await this.prisma.user.create({ data: userData });
    return user;
  }

  /**
   * @method getAll
   * @param filter query filter
   * @return {Promise} IUser | []
   */
  public async getAll(filter = {}): Promise<any> {
    const users = await this.prisma.user.findMany({ where: filter });
    return users;
  }

  /**
   * @method get
   * @param _id user _id
   * @return {Promise} IUser | null
   */
  public async get(_id: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: _id }
    })

    return user;
  }
  /**
   * @method getOneByFilter
   * @param _id user _id
   * @return {Promise} IUser | null
   */
  public async getOneByFilter(filter: {}): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: filter });
    return user;
  }

  /**
   * @method update
   * @param _id user _id
   * @param data user new data
   * @return {Promise} IUser | null
   */
  public async update(_id: any, data: any): Promise<any> {
    const user = await this.prisma.user.update({
      where: { id: _id },
      data,
    })
    return user;
  }

  /**
   * @method updateByFilter
   * @param _id user _id
   * @param data user new data
   * @return {Promise} IUser | null
   */
  public async updateByFilter(filter: any, data: any): Promise<any> {
    const user = await this.prisma.user.update({
      where: filter,
      data,
    })
    return user;
  }

  /**
   * @method delete
   * @param _id user _id
   * @return {Promise} boolean
   */
  public async delete(_id: any): Promise<boolean> {
    await this.prisma.user.delete({
      where: { id: _id },
    })

    return true;
  }

  /**
   * @method findOne
   * @param filter query filter
   * @return {Promise} User || null
   */
  public async findOne(filter: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: filter,
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });
    return user;
  }
  /**
   * @method userAct
   * @param filter query filter
   * @return {Promise} User || null
   */
  public async userAct(data: any): Promise<any> {
    let _user = await this.prisma.user.findFirst({
      where: { id: data.userID },
      select: {
        id: true,
      },
    });
    if (!_user) throw new AppError(`no user with id ${data.userID}`)
    if (_user.id == data.user.id) throw new AppError(`can't follow yourself`)
    let follows: any = data.user.follows.find((id: string) => id == data.userID)
    if (follows) {
      //unfollow
      follows = data.user.follows.filter((id: string) => id != data.userID)
    } else {
      //follow
      follows = [...data.user.follows, data.userID]
    }

    _user = await this.prisma.user.update({
      where: { id: data.user.id },
      data: {
        follows: { set: follows }
      }
    })


    return { status: data.user.follows.find((id: string) => id == data.userID) ? 'unfollowed' : 'followed', user: _user };
  }

  // /**
  //  * @method updatePassword
  //  * @param _id user _id
  //  * @param data user new data
  //  * @return {Promise} IUser |
  //  */
  // public async updatePassword(
  //   _id: string,
  //   { currentPassword, password }: Partial<IUser>
  // ): Promise<{ user: any; token: string }> {
  //   if (!currentPassword) throw new ValidationError('currentPassword field is required', 'currentPassword');
  //   if (!password) throw new ValidationError('password field is required', 'password');

  //   const user = await this.prisma.user.findFirst({
  //     where: {id:_id},
  //     select: {
  //     password: true,

  //     },
  //     });
  //   if (user && !(await compareHash(currentPassword, user.password))) {
  //     const errorMessage = 'the current password provided is wrong';
  //     const possibleSolution = 'provide the correct current password and try again';
  //     throw new ValidationError(errorMessage, 'currentPassword', possibleSolution);
  //   }

  //   /** Update password and save user */
  //   user!.password = await hashData(password);
  //   await this.prisma.user.update({
  //     where:{id:_id},
  //     data:{
  //       ...user
  //     }
  //   })

  //   /** Sign new token for user */
  //   const token = signToken(user);
  //   return { user, token };
  // }
}
