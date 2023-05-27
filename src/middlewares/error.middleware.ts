import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction,ErrorRequestHandler } from 'express';
import { AppError, DuplicateKeyError, ValidationError, logger } from '../utils';


// export class errorMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     let err = { ...error };
//   console.log('error middleware')
//   // Duplicate Error
//   if (error.code === 11000) {
//     const [field, value] = Object.entries(error.keyValue)[0];
//     err = new DuplicateKeyError('', field, value);
//   }

//   // Validation Error
//   if (error.name === 'ValidationError') {
//     const { errors } = error;
//     const field = Object.keys(errors)[0];
//     const message = errors[field].message;
//     err = new ValidationError(message, field);
//   }

//   // if (error.name === 'CastError') {
//   //   const { stringValue, kind, value, path } = error;
//   //   console.log(error);
//   // }

//   // if (error.name === 'MongoServerError' && error.code === 16755) {
//   //   console.log(error);
//   // }

//   if (error.name === 'JsonWebTokenError') {
//     const message = 'Invalid jwt token provided';
//     const solution = 'Try providing a valid jwt token or try login again to generate new token';
//     err = new ValidationError(message, 'token', solution);
//   }

//   // Check If error is generated from AppError Class
//   if (!(err instanceof AppError)) {
//     const serverError = 'Internal server error, please try again later. or send a mail to support@bluetanks.tech';
//     err.type = error.type || err.type || 'InternalServerError';
//     err.statusCode = error.statusCode || err.statusCode || 500;
//     err.message = error.message || err.message || serverError;
//     err.code = error.code || err.code || undefined;
//   }

//   /** Log error on environments other than production and test*/
//   if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
//     logger.error(err.message);
//   }

//   /** Send error response */
//   res.status(err.statusCode).json({
//     success: false,
//     error: {
//       type: err.type,
//       field: err.field || undefined,
//       code: err.code || error.code || undefined,
//       message: err.message,
//       possibleSolution: err.possibleSolution || undefined,
//     },
//   });
//     // console.log('Request...');
//     // next();
//   }
// }
// @Injectable()
// export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
//   let err = { ...error };
//   console.log('error middleware')
//   // Duplicate Error
//   if (error.code === 11000) {
//     const [field, value] = Object.entries(error.keyValue)[0];
//     err = new DuplicateKeyError('', field, value);
//   }

//   // Validation Error
//   if (error.name === 'ValidationError') {
//     const { errors } = error;
//     const field = Object.keys(errors)[0];
//     const message = errors[field].message;
//     err = new ValidationError(message, field);
//   }

//   // if (error.name === 'CastError') {
//   //   const { stringValue, kind, value, path } = error;
//   //   console.log(error);
//   // }

//   // if (error.name === 'MongoServerError' && error.code === 16755) {
//   //   console.log(error);
//   // }

//   if (error.name === 'JsonWebTokenError') {
//     const message = 'Invalid jwt token provided';
//     const solution = 'Try providing a valid jwt token or try login again to generate new token';
//     err = new ValidationError(message, 'token', solution);
//   }

//   // Check If error is generated from AppError Class
//   if (!(err instanceof AppError)) {
//     const serverError = 'Internal server error, please try again later. or send a mail to support@bluetanks.tech';
//     err.type = error.type || err.type || 'InternalServerError';
//     err.statusCode = error.statusCode || err.statusCode || 500;
//     err.message = error.message || err.message || serverError;
//     err.code = error.code || err.code || undefined;
//   }

//   /** Log error on environments other than production and test*/
//   if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
//     logger.error(err.message);
//   }

//   /** Send error response */
//   res.status(err.statusCode).json({
//     success: false,
//     error: {
//       type: err.type,
//       field: err.field || undefined,
//       code: err.code || error.code || undefined,
//       message: err.message,
//       possibleSolution: err.possibleSolution || undefined,
//     },
//   });
// };
