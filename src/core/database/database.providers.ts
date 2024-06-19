import { DataSource } from 'typeorm';
import * as path from 'path';

import { ENV_VARIABLES } from '@/common/config/env.config';

const entitiesPath = path.resolve(__dirname, '../../**/*.entity{.ts,.js}');
const migrationsPath = path.resolve(
  __dirname,
  '../../core/database/migrations/{*.ts,*.js}',
);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: ENV_VARIABLES.DB_HOST,
        port: +ENV_VARIABLES.DB_PORT,
        username: ENV_VARIABLES.DB_USER,
        password: ENV_VARIABLES.DB_PWD,
        database: ENV_VARIABLES.DB_NAME,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        synchronize: false,
        migrationsRun: true,
        migrationsTableName: 'es_tb_migrations',
        logging: true,
        name: 'database',
      });

      return dataSource.initialize();
    },
  },
];
