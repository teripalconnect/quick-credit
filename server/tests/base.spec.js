import {
  describe, it,
} from 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

chai.should();

describe('Load Base Route', () => {
  it('should load the home route with a welcome message', (done) => {
    request.get('/')
      .end((err, res) => {
        res.status.should.be.eql(200);
        res.body.message.should.be.eql('Welcome to Quick Credit!');
        done();
      });
  });
});
