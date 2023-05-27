import { model, Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from '../interfaces';
import { hashData } from '../utils';


const schema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'email field is required'],
    validate: [validator.isEmail, 'please provide a valid email address'],
    // unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    // required: [true, 'password field is required'],
    minLength: [4, 'password field should be at least 4 characters'],
    maxLength: [255, 'password field should be at most 255 characters'],
    select: false,
  },
 
  username: {
    type: String,
    // required: [true, 'firstname field is required'],
    minlength: [2, 'firstname field should be at least 2 characters'],
    maxlength: [255, 'firstname field should be at most 255 characters'],
    trim: true,
    lowercase: true,
  },

});


/** Added properties */

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });
schema.set('timestamps', { createdAt: true, updatedAt: true });
schema.set('id', false);

export const UserModel = model<IUser>('User', schema);
