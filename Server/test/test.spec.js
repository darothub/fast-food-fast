import { chai, assert } from 'chai';

import chaiHttp from 'chai-http';

import server from '../app';

chai.should();
chai.use(chaiHttp);

describe('Homepage', () => {
  it('should return hello world', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.body.should.deep.equal({ message: 'Hello World' });
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /api/v1/orders', () => {
  it('should return 200 for all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        assert.ok(res.status(200));
        assert.isArray(res.body);
        done();
      });
  });
});

describe('GET /api/v1/orders/:id', () => {
  it('should return order for the given id', (done) => {
    chai.request(server)
      .get('/api/v1/orders/1')
      .end((err, res) => {
        res.should.to.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('result');
        done();
      });
  });
  it('should return error for the unknown id', (done) => {
    chai.request(server)
      .get('/api/v1/orders/0')
      .end((err, res) => {
        res.should.to.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
describe('POST/api/v1/orders', () => {
  it('should return 200 for new orders', (done) => {
    const order = {
      name: 'Darot',
      designation: 'Block 1 Ajegunle',
      dishType: 'Sexy yam',
      drink: 'Tandi',
      qty: 2,
      price: 2500,
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not post without a name', (done) => {
    const order = {
      designation: 'Block 1 Ajegunle',
      dishType: 'Sexy yam',
      drink: 'Tandi',
      qty: parseInt(2, 10),
      price: parseInt(2500, 10),
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(400);
        res.body.should.have.property('name');
        done();
      });
  });
  it('should not post without a dishType', (done) => {
    const order = {
      name: 'Darot',
      designation: 'Block 1 Ajegunle',
      drink: 'Tandi',
      qty: parseInt(2, 10),
      price: parseInt(2500, 10),
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(400);
        res.body.should.have.property('dishType');
        done();
      });
  });
});
describe('PUT/api/v1/orders/:id', () => {
  it('should update order of the given id', (done) => {
    const order = {
      name: 'Darot',
      designation: 'Block 1 Ajegunle',
      dishType: 'Sexy yam',
      drink: 'Tandi',
      qty: 2,
      price: 2500,
    };
    chai.request(server)
      .put('/api/v1/orders/1')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
