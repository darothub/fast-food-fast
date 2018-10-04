import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'fast_food_fast',
  password: null,
  port: 5432,
  max: 15,
  idleTimeoutMillis: 30000,
});

export default pool;
