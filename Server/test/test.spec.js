import chai, { expect, assert } from 'chai';

import chaiHttp from 'chai-http';

import orders from '../dummydb/db';

import server from '../app';

chai.should();
chai.use(chaiHttp);

describe('Homepage', () => {
  it('should return hello world', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.body).deep.equal({ message: 'Hello World' });
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET /api/v1/orders', () => {
  it('should return 200 for all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, res) => {
        assert.isString(res.body.message);
        assert.isObject(res.body);
        assert.deepEqual(res.body.result, orders);
        expect(res.body.result).to.eql(orders);
        expect(res.body.message).to.eql('Success');
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
        assert.isOk(res.body);
        expect(res.body.result).to.eql(orders[0]);
        expect(res.body.message).to.eql('Success');
        expect(res.body.result).to.have.property('id');
        done();
      });
  });
  it('should return error for the unknown id', (done) => {
    chai.request(server)
      .get('/api/v1/orders/0')
      .end((err, res) => {
        res.should.to.have.status(404);
        assert.isOk(res.body);
        assert.deepEqual(res.body.message, 'Not Found');
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
      quantity: 2,
      price: 2500,
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(200);
        assert.isOk(res.body);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('designation');
        expect(res.body).to.have.property('dishType');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('quantity');
        assert.isNumber(res.body.price);
        assert.isNumber(res.body.quantity);
      });
    done();
  });
  it('should not post without a name', (done) => {
    const order = {
      designation: 'Block 1 Ajegunle',
      dishType: 'Sexy yam',
      drink: 'Tandi',
      quantity: parseInt(2, 10),
      price: parseInt(2500, 10),
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(400);
        assert.isFalse(res.body.name);
        assert.propertyVal(res.body, 'message', 'name is required');
        done();
      });
  });
  it('should not post without a dishType', (done) => {
    const order = {
      name: 'Darot',
      designation: 'Block 1 Ajegunle',
      drink: 'Tandi',
      quantity: parseInt(2, 10),
      price: parseInt(2500, 10),
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(400);
        assert.isFalse(res.body.dishType);
        assert.propertyVal(res.body, 'message', 'dishType is required');
        done();
      });
  });
  it('should not post without a designation', (done) => {
    const order = {
      name: 'Darot',
      dishType: 'Amala',
      drink: 'Tandi',
      quantity: parseInt(2, 10),
      price: parseInt(2500, 10),
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(400);
        assert.isFalse(res.body.designation);
        assert.propertyVal(res.body, 'message', 'designation is required');
        done();
      });
  });
  it('should not post without price', (done) => {
    const order = {
      name: 'Darot',
      designation: 'Block 1 Ajegunle',
      dishType: 'Amala',
      drink: 'Tandi',
      quantity: parseInt(2, 10),
    };
    chai.request(server)
      .post('/api/v1/orders')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(400);
        assert.isFalse(res.body.price);
        assert.propertyVal(res.body, 'message', 'price is required');
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
      qty: parseInt(2, 10),
      price: parseInt(2500, 10),
    };
    chai.request(server)
      .put('/api/v1/orders/1')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.to.have.status(200);
        assert.isOk(res.body);
        expect(res.body.message).to.eql('Updated');
        expect(res.body.result).to.have.property('id');
        done();
      });
  });
});
