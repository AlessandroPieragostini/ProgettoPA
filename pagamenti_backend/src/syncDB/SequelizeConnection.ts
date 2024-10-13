import { Sequelize, Dialect } from 'sequelize';
import * as process from "node:process";

// Connessione Sequelize al database
export class SequelizeConnection {
  
  private static instance: SequelizeConnection;
  public sequelize!: Sequelize;

  private constructor() {}
  
  // Inizializza la connessione al database con i parametri definiti
  private static InitializeConnection(): SequelizeConnection {
    
    const newInstance = new SequelizeConnection();

    // Recupera le variabili d'ambiente o imposta valori predefiniti
    const user: string = process.env.POSTGRES_USER || "myuser";
    const password: string = process.env.POSTGRES_PASSWORD || "mypassword";
    const database: string = process.env.POSTGRES_DB || "ztl_db";
    const dialect: Dialect = process.env.SEQUELIZE_DIALECT as Dialect || 'postgres';
    const host: string = process.env.POSTGRES_HOST || 'database';
    const port: number = Number(process.env.POSTGRES_PORT || '5432');

    newInstance.sequelize = new Sequelize(
        database,
        user,
        password,
        {
          dialect: dialect,
          host: host,
          port: port
        });

    return newInstance;
  }

  public static getInstance(): SequelizeConnection {
    if (this.instance === undefined) this.instance = this.InitializeConnection();

    return this.instance;
  }
}
