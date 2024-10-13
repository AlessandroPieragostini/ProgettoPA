import { Sequelize, Dialect } from 'sequelize';
import * as process from "node:process";

// Classe per gestire la connessione Sequelize 
export class SequelizeConnection {
  
  private static instance: SequelizeConnection;
  public sequelize!: Sequelize;

  private constructor() {}
  
  // Metodo privato per inizializzare la connessione al database
  private static InitializeConnection(): SequelizeConnection {
    
    const newInstance = new SequelizeConnection();

    // Ottiene i parametri di connessione dalle variabili d'ambiente o usa valori predefiniti
    const user: string = process.env.POSTGRES_USER || "myuser";
    const password: string = process.env.POSTGRES_PASSWORD || "mypassword";
    const database: string = process.env.POSTGRES_DB || "ztl_db";
    const dialect: Dialect = process.env.SEQUELIZE_DIALECT as Dialect || 'postgres';
    const host: string = process.env.POSTGRES_HOST || 'database';
    const port: number = Number(process.env.POSTGRES_PORT || '5432');

    // Crea una nuova istanza di Sequelize con i parametri di connessione
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

  // Metodo statico per ottenere l'istanza singleton della connessione
  public static getInstance(): SequelizeConnection {
    if (this.instance === undefined) this.instance = this.InitializeConnection();
    return this.instance;
  }
}
