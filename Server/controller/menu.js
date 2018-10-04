import pool from '../model/database';

const getAllmenu = (req, res) => {
  const reqQuery = {
    text: 'SELECT * FROM menu',
  };
  return pool.query(reqQuery)
    .then((menu) => {
      if (menu.rowCount === 0) {
        res.status(204).send({ message: 'No menu is found' });
      }
      res.status(200).send(menu.rows);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

export default getAllmenu;
