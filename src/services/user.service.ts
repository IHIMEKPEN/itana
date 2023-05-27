// import { User } from '../models';
import { IUser } from '../interfaces';
import { compareHash, hashData, signToken, ValidationError } from '../utils';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import { User } from '@prisma/client';

/** User Service class */
@Injectable()
export class UserService {
  /** @private */
  // private readonly _user = User;
  private readonly prisma= new PrismaService();
 

  /**
   * @method create
   * @param userData user data
   * @return {Promise} IUser | Error
   */
  public async create(userData: any): Promise<any> {
    const user = await this.prisma.user.create({data:userData});
    return user;
  }

  /**
   * @method getAll
   * @param filter query filter
   * @return {Promise} IUser | []
   */
  public async getAll(filter = {}): Promise<any> {
    const users = await this.prisma.user.findMany({where: filter});
    return users;
  }

  /**
   * @method get
   * @param _id user _id
   * @return {Promise} IUser | null
   */
  public async get(_id: IUser['_id']): Promise<any> {
    const user = await this.prisma.user.findUnique({where: { id: String(_id) }
})

    return user;
  }
  /**
   * @method getOneByFilter
   * @param _id user _id
   * @return {Promise} IUser | null
   */
  public async getOneByFilter(filter: {}): Promise<any> {
    const user = await this.prisma.user.findFirst({where: filter});
    return user;
  }

  /**
   * @method update
   * @param _id user _id
   * @param data user new data
   * @return {Promise} IUser | null
   */
  public async update(_id: string, data: any): Promise<any> {
    const user = await this.prisma.user.update({
      where: { id:_id },
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
  public async delete(_id: string): Promise<boolean> {
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
