import { Sequelize, Dialect } from 'sequelize';
import * as process from "node:process";
import {logSequelize} from "../ztl_backend/src/middleware/loggerMiddleware";


/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class SequelizeConnection {
  
  // Connection instance
  private static instance: SequelizeConnection;
  public sequelize!: Sequelize;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}
  
  // Initialize connection
  private static InitializeConnection(): SequelizeConnection {
    
    const newInstance = new SequelizeConnection();

    const user: string = process.env.POSTGRES_USER || "myuser";
    const password: string = process.env.POSTGRES_PASSWORD || "mypassword";
    const database: string = process.env.POSTGRES_DB || "db_inference";
    const dialect: Dialect = process.env.SEQUELIZE_DIALECT as Dialect || 'postgres';
    const host: string = process.env.POSTGRES_HOST || 'database';
    const port: number = Number(process.env.POSTGRES_PORT || '5432')
    const flag_log: boolean = Boolean(process.env.SEQUELIZE_LOGGING ) || true;

    newInstance.sequelize = new Sequelize(
        database,
        user,
        password,
        {
          dialect: dialect,
          host: host,
          port: port,
          logging: flag_log ? logSequelize : false,
        });

    return newInstance;

  }

  /**
   * static method that controls the access to the singleton instance.
   */
  public static getInstance(): SequelizeConnection {
    if (this.instance === undefined) this.instance = this.InitializeConnection();

    return this.instance;
  }
}