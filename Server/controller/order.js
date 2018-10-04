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
    .then((order) => {
      if (req.body.email !== decoded.email) {
        return res.status(403).send('Not Allowed');
      }
      return res.status(200).send({ message: 'Your order is successful', data: order.rows[0], decoded });
    });
};

const getUserOrderHist = (req, res) => {
  const decoded = jwt.verify(req.token, config.secretkey);
  const reqQuery = {
    text: 'SELECT * FROM users WHERE id=$1',
    values: [req.params.id],
  };
  const updateQuery = {
    text: 'SELECT * FROM orders WHERE email=$1',
    values: [decoded.email],
  };
  return pool.query(reqQuery)
    .then((user) => {
      if (user.rowCount === 0) {
        return res.status(404).send({ message: 'user not found' });
      }
      return pool.query(updateQuery)
        .then((order) => {
          if (user.rows[0].email !== decoded.email) {
            return res.status(400).send('Not found');
          }
          return res.status(200).send(order.rows);
        })
        .catch(err => res.status(500).send({ message: err.message }));
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const getAllorders = (req, res) => {
  const decoded = jwt.verify(req.token, config.secretkey);
  const reqQuery = {
    text: 'SELECT * FROM users WHERE roles=$1',
    values: [decoded.roles],
  };
  const resQuery = {
    text: 'SELECT * FROM orders',
  };
  return pool.query(reqQuery)
    .then((user) => {
      if (user.rowCount === 0) {
        return res.status(404).send({ message: 'Admin not found' });
      }
      return pool.query(resQuery)
        .then((orders) => {
          if (!orders.rows) {
            res.status(204).send({ message: 'No order is found' });
          }
          res.status(200).send(orders.rows);
        })
        .catch(err => res.status(500).send({ message: err.message }));
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const getOrderById = (req, res) => {
  const decoded = jwt.verify(req.token, config.secretkey);
  const reqQuery = {
    text: 'SELECT * FROM users WHERE roles=$1',
    values: [decoded.roles],
  };
  const resQuery = {
    text: 'SELECT * FROM orders WHERE id=$1',
    values: [req.params.id],
  };
  return pool.query(reqQuery)
    .then((user) => {
      if (user.rowCount === 0) {
        return res.status(404).send({ message: 'Admin not found' });
      }
      return pool.query(resQuery)
        .then((order) => {
          if (order.rowCount === 0) {
            return res.status(204).send({ order, message: 'No order is found' });
          }
          return res.status(200).send(order.rows);
        })
        .catch(err => res.status(500).send({ message: err.message }));
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const updateOrderStatus = (req, res) => {
  const decoded = jwt.verify(req.token, config.secretkey);
  const reqQuery = {
    text: 'SELECT * FROM users WHERE roles=$1',
    values: [decoded.roles],
  };

  // const resQuery = {
  //   text: 'SELECT * FROM orders WHERE id=$1',
  //   values: [req.params.id],
  // };

  const resQuery = {
    text: 'UPDATE orders SET order_status=$1 WHERE id=$2 RETURNING *',
    values: [req.body.order_status, req.params.id],
  };
  return pool.query(reqQuery)
    .then((user) => {
      if (user.rowCount === 0) {
        return res.status(404).send({ message: 'Admin not found' });
      }
      if (req.body.order_status === '' || req.body.order_status === undefined) {
        return res.status(400).send({ message: 'No change is made' });
      }
      return pool.query(resQuery)
        .then(order => res.status(200).send({ message: `order_status ${order.rows[0].order_status} is updated` }));
    });
};

const userOrders = {
  placeOrder, getUserOrderHist, getAllorders, getOrderById, updateOrderStatus,
};

export default userOrders;
