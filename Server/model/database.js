import pg from 'pg';

let connection;

const string = {
  host: 'localhost',
  user: 'postgres',
  database: 'fast_food_fast',
  password: null,
  port: 5432,
  max: 15,
  idleTimeoutMillis: 30000,
};

if (process.env.NODE_ENV === 'production') {
  connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
} else {
  connection = string;
}

const pool = new pg.Pool(connection);
export default pool;
