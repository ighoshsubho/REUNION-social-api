import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;

describe('POST /api/posts', () => {
  it('should create a new post and return a success message', async () => {
    const post = {
      title: 'Test Post',
      desc: 'This is a test post.',
    };

    const token = 'your-valid-jwt-token';

    const res = await chai
      .request('http://localhost:3000')
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(post);

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
    expect(res.body.message).to.equal('Post created successfully.');

    // Cross validate the response with data in the database table
    const postId = res.body.postId;
    const createdPost = await Post.findById(postId);
    expect(createdPost.title).to.equal(post.title);
    expect(createdPost.desc).to.equal(post.desc);
  });
});
