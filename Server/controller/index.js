import orders from '../db/db';

const getAllOrders = (req, res) => {
  res.status(200).send({ message: 'Success', result: orders });
};

const getOrderById = (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (!order) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }
  res.status(200).send({ message: 'Success', result: order });
};

const createOrder = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ name: false, message: 'name is required' });
  }
  if (!req.body.dishType) {
    return res.status(400).send({ dishType: false, message: 'dishType is required' });
  }
  if (!req.body.designation) {
    return res.status(400).send({ designation: false, message: 'designation is required' });
  }

  if (!req.body.price) {
    return res.status(400).send({ price: false, message: 'price is required' });
  }
  const newOrder = {
    id: orders.length + 1,
    name: req.body.name,
    date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    designation: req.body.designation,
    dishType: req.body.dishType,
    drink: req.body.drink,
    quantity: parseInt(req.body.quantity, 10),
    price: parseInt(req.body.price, 10),
    status: 'pending',
  };
  orders.push(newOrder);
  return res.status(200).send(newOrder);
};
const updateOrder = (req, res) => {
  const order = orders.find(element => element.id === parseInt(req.params.id, 10));
  if (!order) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }
  order.name = req.body.name;
  order.designation = req.body.designation;
  order.dishType = req.body.dishType;
  order.drink = req.body.drink;
  order.quantity = req.body.quantity;
  order.price = req.body.price;
  order.status = req.body.status;
  res.status(200).send({ message: 'Updated', result: order });
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
