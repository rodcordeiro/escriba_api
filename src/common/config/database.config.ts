import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const DB_CONFIG: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  migrations: [__dirname + '/core/database/migrations/{.ts,*.js}'],
  entities: [__dirname + '/modules/*/entities/*.entity.js'],
  synchronize: true,
  // migrationsRun: true,
  // debug: true,
};

export { DB_CONFIG };
