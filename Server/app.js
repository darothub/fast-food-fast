import express from 'express';

import bodyParser from 'body-parser';

import router from './router/index';

import userRouter from './router/userRouter';

import orderRouter from './router/orderRouter';

import menuRouter from './router/menuRouter';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api/v2', router);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', menuRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
export default app;
