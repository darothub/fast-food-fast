const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

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
