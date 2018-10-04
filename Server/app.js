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


app.use(router);
app.use(userRouter);
app.use(orderRouter);
app.use(menuRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
export default app;
