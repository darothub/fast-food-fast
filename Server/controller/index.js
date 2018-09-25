import Joi from 'joi';

import orders from '../db/db';

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

const getAllOrders = (req, res) => {
  res.status(200).send({ message: 'Success', result: orders });
};

const getOrderById = (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (order) {
    res.status(200).send({ message: 'Success', result: order });
  }
  res.status(404).send({ message: 'Not Found' });
};

const createOrder = (req, res) => {
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
};
const updateOrder = (req, res) => {
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
};

const deleteOrder = (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (!order) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }
  const position = orders.indexOf(order);
  orders.splice(position, 1);
  res.send({ message: 'Deleted', result: order, current: orders });
};
const controllers = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

export default controllers;
