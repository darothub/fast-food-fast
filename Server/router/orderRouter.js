import express from 'express';

import users from '../controller/order';

import checkAuth from '../controller/token/verifytoken';

const router = express.Router();

router.post('/orders', checkAuth, users.placeOrder);

router.get('/orders', checkAuth, users.getAllorders);

router.get('/users/:id/orders', checkAuth, users.getUserOrderHist);

router.put('/orders/:id', checkAuth, users.updateOrderStatus);

router.get('/orders/:id', checkAuth, users.getOrderById);

export default router;
