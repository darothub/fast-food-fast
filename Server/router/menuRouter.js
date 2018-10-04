import express from 'express';

import menu from '../controller/menu';

import checkAuth from '../controller/token/verifytoken';

const router = express.Router();

router.get('/menu', menu.getAllmenu);

router.post('/menu', checkAuth, menu.addNewMenu);

export default router;
