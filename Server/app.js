import Joi from 'joi';

import express from 'express';

import bodyParser from 'body-parser';

import orders from './db/db';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 9000;

const validateOrder = (input) => {
  const schema = {
    name: Joi.string().alphanum().min(3).max(30)
      .required(),
    designation: Joi.string().alphanum().min(3).max(30)
      .required(),
    dishType: Joi.string()
      .required(),
    drink: Joi.string().alphanum().min(3).max(30)
      .required(),
    qty: Joi.number().min(1).max(2)
      .required(),
    price: Joi.number().min(3)
      .required(),
    status: Joi.string(),
  };

  return Joi.validate(input, schema);
};

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/api/v1/orders', (req, res) => {
  res.status(200).send({ message: 'Success', result: orders });
});

app.get('/api/v1/orders/:id', (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (!order) {
    res.status(404).send({ message: 'Not Found' });
  }
  res.status(200).send({ message: 'Success', result: order });
});

app.post('/api/v1/orders', (req, res) => {
  const result = validateOrder(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const newOrder = {
    id: orders.length + 1,
    name: req.body.name,
    date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    designation: req.body.designation,
    dishType: req.body.dishType,
    drink: req.body.drink,
    qty: req.body.qty,
    price: req.body.price,
    status: 'pending',
  };
  orders.push(newOrder);
  res.send({ message: 'Success', result: orders });
});

app.put('/api/v1/orders/:id', (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (!order) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }
  const result = validateOrder(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  order.name = req.body.name;
  order.designation = req.body.designation;
  order.dishType = req.body.dishType;
  order.drink = req.body.drink;
  order.qty = req.body.qty;
  order.price = req.body.price;
  order.status = req.body.status;
  res.send({ message: 'Updated', result: order });
});

app.delete('/api/v1/orders/:id', (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (!order) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }

  const position = orders.indexOf(order);
  orders.splice(position, 1);
  res.send({ message: 'Deleted', result: order, current: orders });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
