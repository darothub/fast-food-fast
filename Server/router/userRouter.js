import express from 'express';

import User from '../controller/auth';

import users from '../controller/order';

import checkAuth from '../controller/token/verifytoken';

const router = express.Router();

router.post('/auth/signup', User.signup);

router.post('/auth/signin', User.signin);

router.post('/orders', checkAuth, users.placeOrder);

router.get('/users/:id/orders', checkAuth, users.getUserOrderHist);


export default router;
