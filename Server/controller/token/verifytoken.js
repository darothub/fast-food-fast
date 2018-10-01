import jwt from 'jsonwebtoken';

import config from '../../model/config';

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (typeof tokenHeader !== 'undefined') {
    const tokenBearer = tokenHeader.split(' ');
    const bearerToken = tokenBearer[1];
    req.token = bearerToken;
    const decoded = jwt.verify(req.token, config.secretkey);
    req.userData = decoded;
    next();
  } else {
    res.status(403);
  }
};

export default verifyToken;
