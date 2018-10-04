import express from 'express';

import User from '../controller/auth';

const router = express.Router();

router.post('/auth/signup', User.signup);

router.post('/auth/signin', User.signin);


export default router;
