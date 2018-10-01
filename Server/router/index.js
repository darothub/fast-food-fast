import express from 'express';

import controllers from '../controller/index';

import User from '../controller/auth/user';

import users from '../controller/order';

import checkAuth from '../controller/token/verifytoken';

const router = express.Router();

router.get('/api/v1/orders', controllers.getAllOrders);

router.get('/api/v1/orders/:id', controllers.getOrderById);

router.post('/api/v1/orders', controllers.createOrder);

router.put('/api/v1/orders/:id', controllers.updateOrder);

router.delete('/api/v1/orders/:id', controllers.deleteOrder);

router.post('/auth/signup', User.signup);

router.post('/auth/signin', User.signin);

router.post('/orders', checkAuth, users.placeOrder);

router.get('/users/:id/orders', checkAuth, users.getUserOrder);

export default router;
