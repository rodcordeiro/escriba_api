import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DB_CONFIG } from '@/common/config/database.config';
const dataSource = new DataSource(DB_CONFIG);
export default dataSource;
