import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/posts (Negative Test)', () => {
  it('should return an error when the title field is missing', (done) => {
    // Login as test user and obtain JWT token
    chai.request(app)
      .post('/api/authenticate')
      .send({ email: 'test@example.com', password: 'testpassword' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        const token = res.body.token;

        // Get the number of posts before making the request
        chai.request(app)
          .get('/api/posts')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            const prevNumPosts = res.body.length;

            // Make a POST request with the title field missing
            chai.request(app)
              .post('/api/posts')
              .set('Authorization', `Bearer ${token}`)
              .send({ description: 'Test post description' })
              .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Title field is required');

                // Check the number of posts after making the request
                chai.request(app)
                  .get('/api/posts')
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    const currNumPosts = res.body.length;
                    expect(currNumPosts).to.equal(prevNumPosts);

                    done();
                  });
              });
          });
      });
  });
});
