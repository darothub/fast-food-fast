import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../model/database';
import config from '../model/config';

const validUser = (user) => {
  const regexp = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

  const validEmail = regexp.test(user.email);
  const validPassword = typeof user.password === 'string'
                                      && user.password.trim() !== ''
                                      && user.password.trim().length >= 6;
  return validEmail && validPassword;
};

const signup = (req, res) => {
  const { username, email, password } = req.body;
  const reqQuery = {
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email],
  };
  const resQuery = {
    text: 'INSERT INTO users(username, email, pass) VALUES($1, $2, $3) RETURNING *',
    values: [username, email, bcrypt.hashSync(password, 10)],
  };
  if (!validUser(req.body)) {
    return res.status(400).send({ message: 'input correct details' });
  }
  return pool.query(reqQuery)
    .then((data) => {
      if (data.rowCount === 1) {
        return res.status(400).send({
          message: 'User already exist',
        });
      }
      return pool.query(resQuery)
        .then(user => res.status(201).send({
          message: 'Created', user: user.rows[0],
        }))
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));
};

const signin = (req, res) => {
  // const { username, email, password } = req.body;
  const selQuery = {
    text: 'SELECT * FROM users WHERE email=$1',
    values: [req.body.email],
  };
  if (!validUser(req.body)) {
    return res.status(400).send({ message: 'input correct details' });
  }
  return pool.query(selQuery)
    .then((data) => {
      if (data.rowCount === 0) {
        return res.status(404).send({ message: 'user not found' });
      }
      if (bcrypt.compare(req.body.password, data.rows[0].pass)) {
        const token = jwt.sign({
          id: data.rows[0].id,
          email: data.rows[0].email,
          roles: data.rows[0].roles,
        }, config.secretkey, {
          expiresIn: '24h',
        });
        return res.status(200).send({ token, message: 'You have signed in successfully' });
      }
      return res.status(409).send({ message: 'invalid username/password' });
    })
    .catch(e => res.send(e));
};
const user = {
  signup,
  signin,
};
export default user;
