import mongoose from 'mongoose';
import { ENVIRONMENT } from '.';
import { logger } from '../utils';

/** Database class */
class Database {
  constructor(private readonly uri: string = '', private readonly options = {}) {}

  public async connectMongoDB(uri: string = this.uri, options = this.options) {
    /** MongoDB connection options */
    const defaultOptions = {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    if (ENVIRONMENT === 'production') {
      defaultOptions.autoIndex = false;
    }

    /** Connect to Mongodb */
    try {
      await mongoose.connect(uri, { ...defaultOptions, ...options });
      logger.info(`😃 Database connected successfully`);
    } catch (error: any) {
      logger.error(`🤢 Database Error: ${error.message}`);
    }

    /** Listen on database events */
    mongoose.connection.on('disconnected', () => {
      logger.warn(`😎 Database disconnected successfully`);
    });
  }
}

export const database = new Database();
