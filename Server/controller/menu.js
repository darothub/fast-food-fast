import jwt from 'jsonwebtoken';
import pool from '../model/database';
import config from '../model/config';

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

const addNewMenu = (req, res) => {
  const decoded = jwt.verify(req.token, config.secretkey);
  const reqQuery = {
    text: 'INSERT INTO menu(food, price, food_image) VALUES($1, $2, $3) RETURNING *',
    values: [req.body.food, req.body.price, req.body.image],
  };
  if (!req.body.food) {
    return res.status(400).send({ message: 'Food name is required' });
  }
  if (!req.body.price) {
    return res.status(400).send({ message: 'Price is required' });
  }
  if (!req.body.image) {
    return res.status(400).send({ message: 'Food image is essential' });
  }
  return pool.query(reqQuery)
    .then((menu) => {
      if (decoded.roles !== 'Admin') {
        return res.status(401).send({ Unauthorised: 'You are not an Admin' });
      }
      return res.status(200).send({ message: 'Your menu post is successful', data: menu.rows[0] });
    });
};

export default { getAllmenu, addNewMenu };
