import express from 'express';

import controllers from '../controller/index';

const router = express.Router();

router.get('/api/v1/orders', controllers.getAllOrders);

router.get('/api/v1/ride/:id', controllers.getOrderById);

router.post('/api/v1/rides', controllers.createOrder);

router.put('/api/v1/rides', controllers.updateOrder);

router.delete('/api/v1/rides', controllers.deleteOrder);

export default router;
