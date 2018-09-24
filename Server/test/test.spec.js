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
        res.should.be.json();
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('designation');
        res.body[0].should.have.property('dishType');
        res.body[0].should.have.property('drink');
        res.body[0].should.have.property('qty');
        res.body[0].should.have.property('price');
        res.body[0].should.have.property('status');
        done();
      });
  });
});
