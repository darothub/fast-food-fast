import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../app';


chai.should();
chai.use(chaiHttp);

describe('Homepage', () => {
  it('should return hello world', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.json = ({ message: 'Hello World' });
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /api/v1/orders', () => {
  it('should return all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('result');
        done();
      });
  });
});

describe('GET /api/v1/orders/:id', () => {
  it('should return error if not found', (done) => {
    chai.request(server)
      .get('/api/v1/orders/:id')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should return a single order', (done) => {
    chai.request(server)
      .get('/api/v1/orders/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
