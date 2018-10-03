import express from 'express';

import users from '../controller/order';

import checkAuth from '../controller/token/verifytoken';

const router = express.Router();

router.post('/orders', checkAuth, users.placeOrder);

router.get('/orders', checkAuth, users.getAllorders);

export default router;
