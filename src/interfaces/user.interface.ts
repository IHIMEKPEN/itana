import { Types, Document } from 'mongoose';

export interface IUser extends Document {
  _id?: Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  follows:string[]
  followers:string[]

}
