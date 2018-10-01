import express from 'express';

import controllers from '../controller/index';

import User from '../controller/auth/user';

import getAll from '../dbController';

const router = express.Router();

router.get('/api/v1/orders', controllers.getAllOrders);

router.get('/api/v1/orders/:id', controllers.getOrderById);

router.post('/api/v1/orders', controllers.createOrder);

router.put('/api/v1/orders/:id', controllers.updateOrder);

router.delete('/api/v1/orders/:id', controllers.deleteOrder);

router.get('/api/v1/others', getAll);

router.post('/auth/signup', User.signup);

router.post('/auth/signin', User.signin);

export default router;
