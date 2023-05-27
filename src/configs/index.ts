/**
 * @module config
 * @description export configuration files
 */

import 'dotenv/config';

/** App Properties */
export const APP_NAME = process.env.APP_NAME
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const CLIENT_URL = ENVIRONMENT == 'development' ? 'http://localhost' : process.env.CLIENT_URL 

/** Environment and Database */
export const PORT = process.env.PORT || 2023;
export const WORKER = ENVIRONMENT == 'development' ? false: true
export const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${APP_NAME}`;
export const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST || `mongodb://localhost:27017/${APP_NAME}_tests`;

/** JWT and Hashing */
export const JWT_KEY = process.env.JWT_KEY as string;
export const JWT_EXPIRES_AT = process.env.JWT_EXPIRES_AT || '90d';
export const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

/** Mail Options */
export const MAIL_FROM = process.env.MAIL_FROM;
export const MAIL_OPTIONS = {
  service: 'gmail',
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

/** AWS Credentials */
export const AWS_BUCKET = process.env.AWS_BUCKET;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

/** Paystack Credentials */
export const PAYSTACK_PK = ENVIRONMENT == 'development' ? process.env.PAYSTACK_PK_TEST : process.env.PAYSTACK_PK_LIVE;
export const PAYSTACK_SK = ENVIRONMENT == 'development' ? process.env.PAYSTACK_SK_TEST : process.env.PAYSTACK_SK_LIVE;

/** Twilo Credentials */
export const TWILO_SID = process.env.TWILO_SID;
export const TWILO_TOKEN = process.env.TWILO_TOKEN;
export const TWILO_MESSAGE_SID = process.env.TWILO_MESSAGE_SID;

/** Third Party Auth Credentials */
export const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID as string
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string

export const SUPPORT_EMAIL = ENVIRONMENT == 'development' ? 'oihimekpen+@gmail.com' : process.env.SUPPORT_EMAIL;
/** Export Database instance */
export { database as db } from './db';

