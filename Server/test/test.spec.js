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
        res.body.should.deep.equal({ message: 'Hello World' });
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /api/v1/orders', () => {
  it('should return all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .then((res) => {
        res.should.to.have.status(200);
        res.body.should.have.property('result');
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('GET /api/v1/orders/:id', () => {
  it('should return error if not found', (done) => {
    chai.request(server)
      .get('/api/v1/orders/:id')
      .then((res) => {
        res.body.should.be.an('object');
      })
      .catch((err) => {
        console.log(err);
      });
    done();
  });
  it('should return a single order', (done) => {
    chai.request(server)
      .get('/api/v1/orders/:id')
      .then((res) => {
        res.should.have.status(200);
      })
      .catch((err) => {
        console.log(err);
      });
    done();
  });
});

describe('POST /api/v1/orders', () => {
  it('should add new orders', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .send({
        name: 'Tope',
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
        designation: 'Oshodi',
        dishType: 'Amala',
        drink: 'Goldspot',
        qty: 2,
        price: 2340,
      })
      .then((res) => {
        res.should.to.have.status(201);
        res.body.should.have.property('result');
        res.body.should.be.an('object');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
