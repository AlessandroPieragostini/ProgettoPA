import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { Express, Request, Response, NextFunction } from 'express';
import * as rfs from 'rotating-file-stream';
import * as process from "node:process";

require('dotenv').config();

// define the root dir
const logDirectory :string = path.resolve(process.env.LOG_PATH || '/app/logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// define the access log dir
const accessLogDirectory :string = path.join(logDirectory, process.env.LOG_ACCESS_DIR || 'access');
fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory);

// define the error log dir
const errorLogDirectory :string = path.join(logDirectory, process.env.LOG_ERRORS_DIR || 'errors');
fs.existsSync(errorLogDirectory) || fs.mkdirSync(errorLogDirectory);

// define the sequelize log dir
const sequelizeLogDirectory :string = path.join(logDirectory, process.env.LOG_SEQUELIZE_DIR || 'sequelize');
fs.existsSync(sequelizeLogDirectory) || fs.mkdirSync(sequelizeLogDirectory);

const interval_rotation: string = process.env.LOG_INTERVAL_ROTATION || '1d';

// Create a rotating write stream for access logs
const accessLogStream :rfs.RotatingFileStream = rfs.createStream('access.log', {
  interval: interval_rotation,
  path: accessLogDirectory,
});

// Create a rotating write stream for error logs
const errorLogStream :rfs.RotatingFileStream = rfs.createStream('error.log', {
  interval: interval_rotation,
  path: errorLogDirectory,
});

// Create a rotating write stream for sequelize logs
const sequelizeLogStream :rfs.RotatingFileStream = rfs.createStream('sequelize.log', {
  interval: interval_rotation,
  path: sequelizeLogDirectory,
});

const getLogFormat = () => {
  const env :string = process.env.NODE_ENV || 'development';
  return env === 'production' ? 'combined' : 'dev';
};

const getMorganMiddleware = () => {
  const logOutput = process.env.LOG_OUTPUT || 'both';
  const logFormat = getLogFormat();

  switch (logOutput) {
    case 'console':
      return morgan(logFormat);
    case 'file':
      return morgan(logFormat, { stream: accessLogStream });
    case 'both':
    default:
      return morgan(logFormat, {
        stream: {
          write: (message: string) => {
            accessLogStream.write(message);
            process.stdout.write(message);
          },
        },
      });
  }
};


const setupLogging = (app: Express) => {
  app.use(getMorganMiddleware());

  // Error logging middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const errorLog = `${new Date().toISOString()} - ${req.method} ${req.url} - ${err.stack || err.message}\n`;
    errorLogStream.write(errorLog);
    next(err);
  });
};


const logSequelize = (msg: string) => {
  const logOutput = process.env.LOG_OUTPUT || 'both';
  const timestamp = new Date().toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');

  const logMessage = `[${timestamp}] ${msg}`;

  switch (logOutput) {
    case 'console':
      console.log(logMessage);
      break;
    case 'file':
      sequelizeLogStream.write(logMessage + '\n');
      break;
    case 'both':
    default:
      sequelizeLogStream.write(logMessage + '\n');
      console.log(logMessage);
      break;
  }
};


export { setupLogging, logSequelize };

// ----------------------------------------------------------

// import * as rfs from 'rotating-file-stream';
// import * as process from "node:process";
// import path from 'path';
// import fs from 'fs';

// const logDirectory :string = path.resolve(process.env.LOG_PATH || '/app/logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const interval_rotation: string = process.env.LOG_INTERVAL_ROTATION || '1d';

// const sequelizeLogDirectory :string = path.join(logDirectory, process.env.LOG_SEQUELIZE_DIR || 'sequelize');
// fs.existsSync(sequelizeLogDirectory) || fs.mkdirSync(sequelizeLogDirectory);

// // Create a rotating write stream for sequelize logs
// const sequelizeLogStream :rfs.RotatingFileStream = rfs.createStream('sequelize.log', {
//     interval: interval_rotation,
//     path: sequelizeLogDirectory,
//   });

// const logSequelize = (msg: string) => {
//     const logOutput = process.env.LOG_OUTPUT || 'both';
//     const timestamp = new Date().toISOString()
//         .replace(/T/, ' ')
//         .replace(/\..+/, '');
  
//     const logMessage = `[${timestamp}] ${msg}`;
  
//     switch (logOutput) {
//       case 'console':
//         console.log(logMessage);
//         break;
//       case 'file':
//         sequelizeLogStream.write(logMessage + '\n');
//         break;
//       case 'both':
//       default:
//         sequelizeLogStream.write(logMessage + '\n');
//         console.log(logMessage);
//         break;
//     }
//   };

