import jwt from 'jsonwebtoken';
import pool from '../model/database';
import config from '../model/config';


const placeOrder = (req, res) => {
  const decoded = jwt.verify(req.token, config.secretkey);
  const reqQuery = {
    text: 'INSERT INTO orders(destination, dish, quantity, price, email) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [req.body.destination, req.body.dish,
      req.body.quantity, parseInt(req.body.price, 10), req.body.email],
  };
  if (req.body.email === '' || req.body.destination === '') {
    return res.status(400).send({ message: 'email or destinaton can not be null' });
  }
  if (req.body.dish === '' || req.body.price === '') {
    return res.status(400).send({ message: 'dish or price can not be null' });
  }
  return pool.query(reqQuery)
    .then(order => res.status(200).send({ message: 'Your order is successful', data: order.rows[0], decoded }));
};

const userOrders = { placeOrder };
export default userOrders;
