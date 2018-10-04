import express from 'express';

import controllers from '../controller/index';

const router = express.Router();

router.get('/orders', controllers.getAllOrders);

router.get('/orders/:id', controllers.getOrderById);

router.post('/orders', controllers.createOrder);

router.put('/orders/:id', controllers.updateOrder);

router.delete('/orders/:id', controllers.deleteOrder);


export default router;
