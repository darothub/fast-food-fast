import express from 'express';

import bodyParser from 'body-parser';

import router from './router/index';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/api/v1/orders', router);

app.get('/api/v1/orders/:id', router);

app.post('/api/v1/orders', router);

app.put('/api/v1/orders/:id', router);

app.delete('/api/v1/orders/:id', router);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
export default app;
