import express from 'express';

import menu from '../controller/menu';

const router = express.Router();

router.get('/menu', menu);

export default router;
