import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const config = (process.env.NODE_ENV === 'prod') ?
  {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
      },
  }
  :
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  }
  
const pool = new Pool(config);

export default pool;