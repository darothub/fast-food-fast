import pool from './model/database';


const getAll = (req, res) => {
  const query = {
    text: 'SELECT * FROM users',
    values: ['brianc', 'brian.m.carlson@gmail.com'],
  };
  pool.query(query)
    .then(user => res.status(200).send(user.rows))
    .catch(e => setImmediate(() => { throw e; }));
};

export default getAll;
