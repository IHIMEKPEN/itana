import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { readFileSync } from 'fs';
import { hash, genSalt, compare } from 'bcrypt';
var jwt = require('jsonwebtoken');
import { BCRYPT_SALT_ROUNDS, JWT_KEY, JWT_EXPIRES_AT } from '../configs';
import {  IUser } from '../interfaces';
// import { pushNotification } from '../services';

interface IData {
  [key: string]: string;
}

interface IChargeData {
  batterySize: number;
  finalPercentage: number;
  rate?: number;
}

/**
 * @method hashData
 * @param data the data to hash
 * @returns encrypted data salt or rejected with an Error
 */
export const hashData = async (data: string | Buffer, rounds: number = BCRYPT_SALT_ROUNDS): Promise<string> => {
  const salt = await genSalt(rounds);
  return await hash(data, salt);
};

/**
 * @function compareHash
 * @param data plain value provided
 * @param encrypted encrypted data to compare against the plain value provided
 * @returns {boolean}
 */
export const compareHash = async (data: string | Buffer, encrypted: string): Promise<boolean> => {
  return await compare(data, encrypted);
};

/**
 * @function codeGenerator Random Code Generator
 * @param length - number of characters default to 4
 * @return {string}
 */
export const codeGenerator = (length: number = 6): string => {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

export const capitalizeFirstChar = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @function signToken
 * @param user user object
 * @returns {string}
 */
export const signToken = ({ id, email}: Partial<IUser>): string => {
  let token=jwt.sign({ _id:id, email}, JWT_KEY as string, { expiresIn: JWT_EXPIRES_AT });

  return token
};



/**
 * @function asyncWrapper
 * @param {function} fn
 */
export const asyncWrapper = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * @function httpResponse
 * @param {string} message response message
 * @param {any} data response data
 */
export const httpResponse = (message: string, data: any = null) => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * @function formatDate
 * @param date
 */
export const formatDate = (date: Date | string | undefined = undefined) => {
  if (!date) {
    return new Date();
  }

  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  const hours = newDate.getHours() + 1;
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return new Date(year, month, day, hours, minutes, seconds);
};

export const templateParser = (fileName: string, data: IData = {}) => {
  let template = readFileSync(path.join(__dirname, `../../views/emails/${fileName}.html`), 'utf-8');
  for (let key in data) {
    const _key = `%${key}%`.toUpperCase();
    template = template.replace(new RegExp(_key, 'g'), data[key]);
  }
  return template;
};

export const getAmount = ({ batterySize, finalPercentage, rate }: IChargeData): number => {
  return ((batterySize * finalPercentage) / 100) * Number(rate);
};

export const getCharge = ({ batterySize, finalPercentage }: IChargeData): number => {
  return (batterySize * finalPercentage) / 100;
};

/**
 * @function generateRandomString
 * @param {Number} stringLength
 * @returns {string}
 */
export const generateRandomString = (stringLength: number): string => {
  stringLength = typeof stringLength === 'number' ? stringLength : 10;
  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let str = '';

  for (let i = 0; i < stringLength; i++) {
    const randomChar = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    str += randomChar;
  }
  return str;
};


