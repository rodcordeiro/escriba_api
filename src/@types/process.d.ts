declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      readonly NODE_ENV: string;
      readonly HOST: string;
      readonly PORT: number;
      readonly ENC_SECRET: string;
      readonly JWT_SECRET: string;
      readonly JWT_REFRESH_SECRET: string;
      readonly JWT_EXPIRES: string;

      /** Database Hostname */
      readonly DB_HOST: string;
      /** Database Port */
      readonly DB_PORT: string;
      /** Database Username */
      readonly DB_USER: string;
      /** Database Password */
      readonly DB_PWD: string;
      /** Database name */
      readonly DB_NAME: string;
    }
  }
}

export {};
