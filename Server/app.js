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

app.use(router);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
export default app;
