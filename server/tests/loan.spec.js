import {
  describe, it,
} from 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';


const request = supertest(app);

chai.should();

describe('Loan', () => {
  const invalidToken = 'asdasdasdsasd';
  let loanId;

  describe('GET /loans', () => {
    let adminToken;
    let userToken;

    before((done) => {
      const adminLoginDetails = {
        email: 'quickuser2@quick-cred.test',
        password: 'dummypass1234'
      };
      const userLoginDetails = {
        email: 'quickuser1@quick-cred.test',
        password: 'dummypass123'
      };
      request.post('/api/v1/auth/signin')
        .send(adminLoginDetails).end((err, res) => {
          ({ token: adminToken } = res.body.data);
        });
      request.post('/api/v1/auth/signin')
        .send(userLoginDetails).end((err, res) => {
          ({ token: userToken } = res.body.data);
          done();
        });
    });

    it('should return all loans', (done) => {
      request.get(`/api/v1/loans?token=${adminToken}`)
        .end((err, res) => {
          res.status.should.be.eql(200);
          done();
        });
    });

    it('should fail to return all loans when user is not admin', (done) => {
      request.get(`/api/v1/loans?token=${userToken}`)
        .end((err, res) => {
          res.status.should.be.eql(403);
          done();
        });
    });

    it('should fail to return all loans when invalid token is supplied', (done) => {
      request.get(`/api/v1/loans?token=${invalidToken}`)
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('invalid token');
          done();
        });
    });

    it('should fail to return all loans when invalid token is supplied', (done) => {
      request.get('/api/v1/loans')
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.message.should.be.eql('no token found');
          done();
        });
    });

    it('should return all repaid loans', (done) => {
      request.get('/api/v1/loans?status=approved&repaid=true')
        .set('authorization', adminToken)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.data.should.be.a('array');
          done();
        });
    });

    it('should return loans not fully paid', (done) => {
      request.get('/api/v1/loans?status=approved&repaid=false')
        .set('authorization', adminToken)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST Loan', () => {
    let token;

    before((done) => {
      const loginDetails = {
        email: 'quickuser1@quick-cred.test',
        password: 'dummypass123'
      };
      request.post('/api/v1/auth/signin')
        .send(loginDetails).end((err, res) => {
          ({ token } = res.body.data);
          done();
        });
    });

    it('should create a loan', (done) => {
      const newLoan = {
        amount: '10000',
        tenor: 12
      };

      request.post('/api/v1/loans')
        .send(newLoan)
        .set('authorization', token)
        .end((err, res) => {
          loanId = res.body.data.id;
          res.status.should.be.eql(201);
          done();
        });
    });
  });

  describe('GET /loans/:loanId', () => {
    let adminToken;

    before((done) => {
      const loginDetails = {
        email: 'quickuser2@quick-cred.test',
        password: 'dummypass1234'
      };
      request.post('/api/v1/auth/signin')
        .send(loginDetails).end((err, res) => {
          ({ token: adminToken } = res.body.data);
          done();
        });
    });

    it('should return a specific loan', (done) => {
      request.get(`/api/v1/loans/${loanId}`)
        .set('authorization', adminToken)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.data.id.should.be.eql(loanId);
          done();
        });
    });
  });
});
